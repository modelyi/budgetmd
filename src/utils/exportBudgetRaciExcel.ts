import * as XLSX from 'xlsx';
import {
  BUDGET_RACI_ITEMS,
  RACI_DEPARTMENTS,
  DEPARTMENT_MATRIX_ROWS,
  BUDGET_PROCESS_STEPS,
} from '../data/budgetRaciData';

/**
 * 导出全面预算编制责任 RACI 矩阵为标准 Excel (.xlsx) 工作簿
 * 紧密关联总体流程 1.1 ~ 3.6 十大落地步骤
 * 
 * 包含 4 张标准业务工作表：
 * 1. 总体流程与RACI责任清单 (全量表单绑定 1.1~3.6 十步流程)
 * 2. 总体流程十步落地执行规范 (1.1~3.6 目标、输入输出、R/A/C/I 与红线规则)
 * 3. 部门与任务步骤交叉矩阵 (12 责任部门 × 10 个任务与步骤)
 * 4. RACI定义与编审管理原则 (治理底线与业财融合规范)
 */
export function exportBudgetRaciToExcel(): void {
  const wb = XLSX.utils.book_new();

  // 任务与步骤 → 任务简述 映射（任务级口径，同一任务各行重复同一简述）
  const stepTaskBrief = new Map(BUDGET_PROCESS_STEPS.map((s) => [s.stepCode, s.taskBrief]));

  // ─────────────────────────────────────────────────────────────
  // Sheet 1: 总体流程与RACI责任清单
  // ─────────────────────────────────────────────────────────────
  const sheet1Data: (string | number)[][] = [
    ['全面预算总体流程与编制责任 RACI 总览清单 (R到具体岗位)'],
    ['规范说明：覆盖 1.1 维护/导入基础数据 至 3.6 出表与调整 总体全生命周期；R=主责落实到具体岗位，A=终审签批，C=协同咨询，I=知情报送'],
    [],
    [
      '序号',
      '任务与步骤',
      '任务简述',
      '表单编码',
      '表单与编制事项名称',
      '预算业务大类',
      '主责执行岗位 (R到岗位)',
      '主责执行部门 (R部门)',
      '终审签批责任人 (A)',
      '协同咨询部门 (C)',
      '知情报送对象 (I)',
    ],
  ];

  BUDGET_RACI_ITEMS.forEach((item) => {
    sheet1Data.push([
      item.seq,
      item.stepTitle,
      stepTaskBrief.get(item.processStep) ?? '',
      item.formCode,
      item.formName,
      item.category,
      item.responsiblePost,
      item.responsibleDept,
      item.accountable,
      item.consulted,
      item.informed,
    ]);
  });

  const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);

  ws1['!cols'] = [
    { wch: 8 },  // 序号
    { wch: 20 }, // 任务与步骤
    { wch: 52 }, // 任务简述（SheetJS CE 不写单元格样式，此处按全文完整可见取宽；样式意图见下方 wrapText 设置）
    { wch: 14 }, // 表单编码
    { wch: 28 }, // 表单名称
    { wch: 22 }, // 业务大类
    { wch: 30 }, // 主责岗位 (R)
    { wch: 28 }, // 主责部门
    { wch: 26 }, // A
    { wch: 28 }, // C
    { wch: 24 }, // I
  ];

  // 「任务简述」列设为自动换行、顶端左对齐（行高交由 Excel 自动撑开）
  for (let r = 4; r < sheet1Data.length; r += 1) {
    const cell = ws1[XLSX.utils.encode_cell({ r, c: 2 })];
    if (cell) {
      cell.s = { alignment: { wrapText: true, vertical: 'top', horizontal: 'left' } };
    }
  }

  XLSX.utils.book_append_sheet(wb, ws1, '总体流程与RACI责任清单');

  // ─────────────────────────────────────────────────────────────
  // Sheet 2: 总体流程十步落地执行规范
  // ─────────────────────────────────────────────────────────────
  const sheet2Data: (string | number)[][] = [
    ['全面预算总体流程十步落地执行规范表 (1.1 ~ 3.6)'],
    ['流程架构：阶段一：准备与启动 (1.1~1.2) → 阶段二：前提与假设 (2.1~2.2) → 阶段三：编审与出表 (3.1~3.6)'],
    [],
    [
      '步骤编码',
      '步骤名称',
      '所属总体阶段',
      '核心定位与目标',
      '主责牵头岗位 (R到岗位)',
      '主导牵头部门 (R部门)',
      '最终签批决策人 (A)',
      '主要协同咨询方 (C)',
      '结果报送知情方 (I)',
      '关联主要表单/事项',
      '前置输入来源',
      '核心产出交付物',
      '落地执行要点与红线规则',
    ],
  ];

  BUDGET_PROCESS_STEPS.forEach((step) => {
    sheet2Data.push([
      step.stepNum,
      step.stepName,
      step.stageName,
      step.summary,
      step.leadPost,
      step.leadDept,
      step.approver,
      step.consulted,
      step.informed,
      step.formCodes.join('、'),
      step.inputs,
      step.outputs,
      step.executionRules,
    ]);
  });

  const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);

  ws2['!cols'] = [
    { wch: 10 }, // 步骤编码
    { wch: 18 }, // 步骤名称
    { wch: 22 }, // 所属总体阶段
    { wch: 40 }, // 核心定位与目标
    { wch: 30 }, // 主责牵头岗位 (R到岗位)
    { wch: 28 }, // 主导牵头部门
    { wch: 26 }, // 终审签批人
    { wch: 28 }, // 协同咨询方
    { wch: 24 }, // 报送知情方
    { wch: 26 }, // 关联主要表单
    { wch: 35 }, // 前置输入
    { wch: 35 }, // 核心产出
    { wch: 55 }, // 落地执行要点
  ];

  XLSX.utils.book_append_sheet(wb, ws2, '总体流程十步落地规范');

  // ─────────────────────────────────────────────────────────────
  // Sheet 3: 部门与任务步骤交叉矩阵
  // ─────────────────────────────────────────────────────────────
  const sheet3Headers = [
    '任务与步骤',
    '覆盖表单范围',
    ...RACI_DEPARTMENTS.map((d) => `${d.name} (${d.shortName})`),
    '跨部门协同要点与执行机制',
  ];

  const sheet3Data: (string | number)[][] = [
    ['责任部门与总体流程十步 RACI 权责交叉矩阵'],
    ['图例说明：R = 主责执行编制 | A = 终审签批决策 | C = 协同咨询输入 | I = 结果报送知情 | - = 无直接关联'],
    [],
    sheet3Headers,
  ];

  DEPARTMENT_MATRIX_ROWS.forEach((row) => {
    const rowValues: (string | number)[] = [
      row.domainName,
      row.codeRange,
      ...RACI_DEPARTMENTS.map((d) => row.mapping[d.id] || '-'),
      row.note,
    ];
    sheet3Data.push(rowValues);
  });

  const ws3 = XLSX.utils.aoa_to_sheet(sheet3Data);

  ws3['!cols'] = [
    { wch: 22 }, // 任务与步骤
    { wch: 22 }, // 表单范围
    ...RACI_DEPARTMENTS.map(() => ({ wch: 18 })), // 部门列
    { wch: 50 }, // 协同要点
  ];

  XLSX.utils.book_append_sheet(wb, ws3, '部门与任务步骤交叉矩阵');

  // ─────────────────────────────────────────────────────────────
  // Sheet 4: RACI 角色定义
  // ─────────────────────────────────────────────────────────────
  const sheet4Data: (string | number)[][] = [
    ['全面预算编制 RACI 角色定义'],
    [],
    ['角色代码', '角色名称', '英文全称', '权责界定', '在预算工作中的管理要求'],
    [
      'R',
      '主责执行人',
      'Responsible',
      '负责该项预算的起草、基础数据收集、测算模型测算及表格录入',
      '每项预算表单必须有且仅有明确的第一执行人/责任部门，对数据填报的及时性与原始计算准确性负责。',
    ],
    [
      'A',
      '终审决策人',
      'Accountable',
      '对该预算模块的最终合理性、真实性及预算目标达成负最终决策与领导责任',
      '一项预算任务有且仅有一位终审责任人（单一A原则），严禁多头负责；分管VP/总监对签批结果承担考核责任。',
    ],
    [
      'C',
      '协助咨询方',
      'Consulted',
      '在编制过程中提供专业定额、基准参数、价格/费率审核或前置输入',
      '双向沟通机制；C 方需在规定时限内提供标准输入（如HR提供工时费率、PMC提供生产排产），不直接承担填报责任。',
    ],
    [
      'I',
      '知情抄送方',
      'Informed',
      '预算下达或审批后，作为工作依据必须知情掌握的相关单位及审计监察部门',
      '单向信息通知；确保上下游信息对称（如销售及时获知排产周期、资金部及时获知采购付款排期）。',
    ],
  ];

  const ws4 = XLSX.utils.aoa_to_sheet(sheet4Data);
  ws4['!cols'] = [
    { wch: 12 },
    { wch: 16 },
    { wch: 16 },
    { wch: 40 },
    { wch: 60 },
  ];

  XLSX.utils.book_append_sheet(wb, ws4, 'RACI角色定义');

  // 触发原生 Excel 文件下载
  const fileName = '全面预算编制责任RACI与总体流程总览_设备制造行业.xlsx';
  XLSX.writeFile(wb, fileName);
}
