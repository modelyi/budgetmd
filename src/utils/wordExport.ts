/**
 * 预算系统需求文档与业务规则导出为专业 Word (.doc / .docx 兼容格式)
 * 采用标准 WordML / MHTML 封装，支持：
 * 1. 规范红头商务公文封面与评审签署栏
 * 2. 核心架构逻辑图（SVG 转换为内嵌 Base64 高保真图片）
 * 3. 跨表取数规则全量数据流总账（带业务分类与法人视角标签）
 * 4. 11 大业务域输入输出卡片与关键勾稽
 * 5. 全文档统一财务口径与设计约定
 */

export interface ExportWordSection {
  title: string;
  contentHtml: string;
}

export interface ExportWordOptions {
  fileName: string;
  docTitle: string;
  subTitle?: string;
  author?: string;
  reviewer?: string;
  version?: string;
  date?: string;
  sections: ExportWordSection[];
}

export function exportHtmlToWord(options: ExportWordOptions): void {
  const {
    fileName,
    docTitle,
    subTitle = '全面预算编制与分析系统需求规格说明',
    author = '全面预算专业顾问团队 / 财务规划部',
    reviewer = '项目总裁 / 财务总监 / 技术实施组',
    version = 'V2.4 (终审基准版)',
    date = new Date().toLocaleDateString('zh-CN'),
    sections,
  } = options;

  const header = `
    <html xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>${docTitle}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: A4;
          margin: 2.2cm 2.0cm 2.0cm 2.0cm;
          mso-page-orientation: portrait;
        }
        @page SectionLandscape {
          size: A4 landscape;
          margin: 1.8cm 1.5cm 1.8cm 1.5cm;
          mso-page-orientation: landscape;
        }
        div.SectionLandscape {
          page: SectionLandscape;
        }
        body {
          font-family: 'PingFang SC', 'Microsoft YaHei', 'SimSun', 'Segoe UI', sans-serif;
          font-size: 10.5pt;
          line-height: 1.6;
          color: #1e293b;
          background: #ffffff;
        }
        .cover-page {
          text-align: center;
          padding-top: 60pt;
          padding-bottom: 80pt;
          page-break-after: always;
        }
        .cover-badge {
          display: inline-block;
          font-size: 11pt;
          font-weight: bold;
          color: #1d4ed8;
          background-color: #eff6ff;
          border: 1pt solid #bfdbfe;
          padding: 4pt 12pt;
          border-radius: 4pt;
          margin-bottom: 24pt;
          letter-spacing: 1pt;
        }
        .cover-title {
          font-size: 26pt;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.3;
          margin-bottom: 12pt;
          letter-spacing: -0.5pt;
        }
        .cover-sub {
          font-size: 13.5pt;
          color: #475569;
          margin-bottom: 40pt;
        }
        .cover-meta-table {
          width: 78%;
          margin: 0 auto;
          border-collapse: collapse;
          border: 1pt solid #cbd5e1;
          font-size: 10pt;
        }
        .cover-meta-table td {
          border: 0.75pt solid #e2e8f0;
          padding: 8pt 12pt;
          text-align: left;
        }
        .cover-meta-table td.label-cell {
          background-color: #f8fafc;
          font-weight: bold;
          color: #334155;
          width: 32%;
        }

        h2 {
          font-size: 15pt;
          font-weight: bold;
          color: #1e3a8a;
          border-bottom: 1.5pt solid #2563eb;
          padding-bottom: 5pt;
          margin-top: 26pt;
          margin-bottom: 12pt;
          page-break-after: avoid;
        }
        h3 {
          font-size: 12.5pt;
          font-weight: bold;
          color: #0f172a;
          margin-top: 16pt;
          margin-bottom: 8pt;
          page-break-after: avoid;
        }
        p {
          margin-top: 4pt;
          margin-bottom: 6pt;
          font-size: 10pt;
        }
        table.data-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10pt;
          margin-bottom: 16pt;
          font-size: 9pt;
        }
        table.data-table th, table.data-table td {
          border: 0.75pt solid #cbd5e1;
          padding: 6pt 8pt;
          text-align: left;
          vertical-align: top;
        }
        table.data-table th {
          background-color: #1e293b;
          color: #ffffff;
          font-weight: bold;
          font-size: 9.5pt;
        }
        table.data-table tr:nth-child(even) td {
          background-color: #f8fafc;
        }
        .tag-persp-a {
          background-color: #16a34a;
          color: #ffffff;
          font-weight: bold;
          padding: 1.5pt 5pt;
          font-size: 8pt;
          border-radius: 2pt;
          display: inline-block;
        }
        .tag-persp-b {
          background-color: #2563eb;
          color: #ffffff;
          font-weight: bold;
          padding: 1.5pt 5pt;
          font-size: 8pt;
          border-radius: 2pt;
          display: inline-block;
        }
        .tag-persp-c {
          background-color: #dc2626;
          color: #ffffff;
          font-weight: bold;
          padding: 1.5pt 5pt;
          font-size: 8pt;
          border-radius: 2pt;
          display: inline-block;
        }
        .rule-card {
          border: 1pt solid #fcd34d;
          background-color: #fffbeb;
          padding: 9pt 12pt;
          margin-top: 8pt;
          margin-bottom: 12pt;
          font-size: 9pt;
          border-radius: 3pt;
        }
        .domain-card {
          border: 1pt solid #e2e8f0;
          padding: 12pt;
          margin-bottom: 16pt;
          background-color: #ffffff;
          page-break-inside: avoid;
          border-radius: 4pt;
        }
        .img-container {
          text-align: center;
          margin: 14pt 0;
          padding: 8pt;
          border: 1pt solid #e2e8f0;
          background-color: #fafbfc;
          page-break-inside: avoid;
        }
        .img-caption {
          font-size: 9pt;
          font-weight: bold;
          color: #475569;
          margin-top: 6pt;
        }
        .footer-note {
          font-size: 8.5pt;
          color: #64748b;
          border-top: 0.5pt solid #cbd5e1;
          margin-top: 30pt;
          padding-top: 10pt;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <!-- 封面公文 -->
      <div class="cover-page">
        <div class="cover-badge">ENTERPRISE BUDGET REQUIREMENTS & SPECIFICATION</div>
        <div class="cover-title">${docTitle}</div>
        <div class="cover-sub">${subTitle}</div>
        
        <table class="cover-meta-table">
          <tr>
            <td class="label-cell">文档名称</td>
            <td>${docTitle}</td>
          </tr>
          <tr>
            <td class="label-cell">方案版本</td>
            <td>${version}</td>
          </tr>
          <tr>
            <td class="label-cell">编写机构 / 角色</td>
            <td>${author}</td>
          </tr>
          <tr>
            <td class="label-cell">审核与签发</td>
            <td>${reviewer}</td>
          </tr>
          <tr>
            <td class="label-cell">生成与基准日期</td>
            <td>${date}</td>
          </tr>
          <tr>
            <td class="label-cell">金额核算口径</td>
            <td>全部不含税 · 单位万元 (CNY 10k) · 精度 0.1</td>
          </tr>
          <tr>
            <td class="label-cell">文档定位与用途</td>
            <td>业务需求方案评审、跨表取数公式配置基准、单体与合并直出三表验收</td>
          </tr>
        </table>
      </div>
  `;

  let bodyContent = '';
  sections.forEach((sec) => {
    bodyContent += `
      <h2>${sec.title}</h2>
      ${sec.contentHtml}
    `;
  });

  const footer = `
      <div class="footer-note">
        本需求规格说明书基于《全面预算编制与分析系统》业务与财务规则总账导出，用于方案评审、需求验收及取数公式配置基准。
      </div>
    </body>
    </html>
  `;

  const fullHtml = header + bodyContent + footer;
  const blob = new Blob(['\ufeff', fullHtml], {
    type: 'application/msword;charset=utf-8',
  });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName.endsWith('.doc') ? fileName : `${fileName}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * 将页面上的 SVG DOM 节点转换为内嵌 Base64 PNG 图片，供 Word 渲染真实架构图
 */
export async function svgToPngBase64(svgElement: SVGSVGElement): Promise<string> {
  return new Promise((resolve) => {
    try {
      const xml = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
      // 显式收窄类型：只取带 createObjectURL / revokeObjectURL 的 URL 工厂，
      // 不并入 window（Window 上没有这两个静态方法，并入后联合类型访问会报 TS2339）
      const urlFactory: {
        createObjectURL(obj: Blob | MediaSource): string;
        revokeObjectURL(url: string): void;
      } = window.URL || window.webkitURL;
      const blobURL = urlFactory.createObjectURL(svgBlob);
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = 1.5; // 提高导出清晰度
        canvas.width = (svgElement.clientWidth || svgElement.viewBox.baseVal.width || 1040) * scale;
        canvas.height = (svgElement.clientHeight || svgElement.viewBox.baseVal.height || 600) * scale;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/png');
          urlFactory.revokeObjectURL(blobURL);
          resolve(dataUrl);
        } else {
          urlFactory.revokeObjectURL(blobURL);
          resolve('');
        }
      };
      image.onerror = () => {
        urlFactory.revokeObjectURL(blobURL);
        resolve('');
      };
      image.src = blobURL;
    } catch {
      resolve('');
    }
  });
}
