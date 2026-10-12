/**
 * 验证通用 Markdown 编辑的锚点往返（一次性只读校验，非单元测试框架）
 * 用法: npx tsx scripts/verifyMarkdownRoundtrip.ts
 */
import {
  serializeFields, deserializeFields, type MdField,
} from '../src/data/logic/logicMarkdown';

const samples: MdField[] = [
  { key: 'a::x::h1', kind: 'h1', original: '页面标题', value: '页面标题' },
  { key: 'a::x::cap', kind: 'caption', original: '小节标题', value: '小节标题' },
  { key: 'a::x::title', kind: 'title', original: '三级标题', value: '三级标题' },
  { key: 'a::x::lab', kind: 'label', original: '强调标签', value: '强调标签' },
  { key: 'a::x::l1', kind: 'line', original: '条目一', value: '条目一' },
  { key: 'a::x::l2', kind: 'line', original: '条目二', value: '条目二' },
  { key: 'a::x::foot', kind: 'foot', original: '脚注说明', value: '脚注说明' },
  { key: 'a::x::text', kind: 'text', original: '这是纯段落正文，不含装饰。', value: '这是纯段落正文，不含装饰。' },
];

let fail = 0;

// 1) 原样往返：每个 key 都应还原
const md = serializeFields(samples);
const back = deserializeFields(md);
for (const s of samples) {
  if (back[s.key] !== s.value) {
    fail++;
    console.log(`[还原失败] ${s.key}: want ${JSON.stringify(s.value)} got ${JSON.stringify(back[s.key])}`);
  }
}

// 2) 模拟用户改写某条：只改该行，其余不动
const edited = md.replace('- 条目一', '- 条目一（人工已改）');
const back2 = deserializeFields(edited);
if (back2['a::x::l1'] !== '条目一（人工已改）') {
  fail++;
  console.log('[改写失败] l1 got', JSON.stringify(back2['a::x::l1']));
}
if (back2['a::x::l2'] !== '条目二') {
  fail++;
  console.log('[误伤] l2 被改变');
}

// 3) 锚点数量一致（不丢字段）
if (Object.keys(back).length !== samples.length) {
  fail++;
  console.log(`[字段数不符] want ${samples.length} got ${Object.keys(back).length}`);
}

console.log(fail === 0 ? 'ROUNDTRIP OK：锚点往返无损、改写精确、字段不丢' : `ROUNDTRIP FAIL：${fail} 处`);
process.exit(fail === 0 ? 0 : 1);
