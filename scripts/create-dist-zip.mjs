import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { dirname, join, relative, sep } from 'path';

const rootDir = process.cwd();
const distDir = join(rootDir, 'dist');
const zipPath = join(distDir, 'download', 'dist.zip');
const publicZipPath = join(rootDir, 'public', 'download', 'dist.zip');

if (!existsSync(distDir)) {
  console.error(`[dist:zip] 未找到 ${distDir}，请先执行 vite build`);
  process.exit(1);
}

const outputRelative = relative(distDir, zipPath).split(sep).join('/');
const excludedFiles = new Set([outputRelative, 'download/demo.exe']);
const files = [];

function collect(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const relativePath = relative(distDir, fullPath).split(sep).join('/');
    if (excludedFiles.has(relativePath)) continue;
    if (statSync(fullPath).isDirectory()) collect(fullPath);
    else files.push({ path: relativePath, data: readFileSync(fullPath) });
  }
}

collect(distDir);
files.sort((a, b) => a.path.localeCompare(b.path));

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function uint16(value) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16LE(value & 0xffff);
  return buffer;
}

function uint32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(value >>> 0);
  return buffer;
}

const localParts = [];
const centralParts = [];
let offset = 0;

for (const file of files) {
  const name = Buffer.from(file.path, 'utf8');
  const checksum = crc32(file.data);
  const localHeader = Buffer.concat([
    uint32(0x04034b50), uint16(20), uint16(0x0800), uint16(0),
    uint16(0), uint16(0), uint32(checksum), uint32(file.data.length),
    uint32(file.data.length), uint16(name.length), uint16(0), name
  ]);
  localParts.push(localHeader, file.data);

  centralParts.push(Buffer.concat([
    uint32(0x02014b50), uint16(20), uint16(20), uint16(0x0800), uint16(0),
    uint16(0), uint16(0), uint32(checksum), uint32(file.data.length),
    uint32(file.data.length), uint16(name.length), uint16(0), uint16(0),
    uint16(0), uint16(0), uint32(0), uint32(offset), name
  ]));

  offset += localHeader.length + file.data.length;
}

const localData = Buffer.concat(localParts);
const centralData = Buffer.concat(centralParts);
const endRecord = Buffer.concat([
  uint32(0x06054b50), uint16(0), uint16(0), uint16(files.length),
  uint16(files.length), uint32(centralData.length), uint32(localData.length), uint16(0)
]);

mkdirSync(dirname(zipPath), { recursive: true });
const zipData = Buffer.concat([localData, centralData, endRecord]);
writeFileSync(zipPath, zipData);
mkdirSync(dirname(publicZipPath), { recursive: true });
writeFileSync(publicZipPath, zipData);
console.log(`[dist:zip] ✅ 已生成 ${zipPath} 和 ${publicZipPath} (${files.length} 个文件, ${(zipData.length / 1024 / 1024).toFixed(2)} MB)`);
