import type { MarkdownTableCell, MarkdownTableGrid } from '../components/MarkdownBudgetTable';

export interface EliminationSummary {
  totalSum: number;
  totalElim: number;
  totalNet: number;
  elimRateText: string;
  hasNumericData: boolean;
}

export interface EliminationDifferenceNotes {
  singleEntity: string;
  elimination: string;
  consolidated: string;
  entryRule: string;
  cashFlowImpact: string;
  relevantForms: { code: string; name: string }[];
}

export interface EliminationResult {
  singleEntityRow: MarkdownTableCell[];
  eliminationRow: MarkdownTableCell[];
  consolidatedRow: MarkdownTableCell[];
  summary: EliminationSummary;
  differenceNotes: EliminationDifferenceNotes;
  hasNumericData: boolean;
}

/**
 * 提取列分组与子标题信息
 */
export function getColumnHeaderInfo(grid: MarkdownTableGrid): { group: string; sub: string }[] {
  const result: { group: string; sub: string }[] = Array.from({ length: grid.colCount }, () => ({ group: '', sub: '' }));
  if (!grid.rows || grid.rows.length === 0) return result;

  // Row 0 表头
  let col0 = 0;
  for (const cell of grid.rows[0]) {
    const cs = cell.colSpan || 1;
    for (let i = 0; i < cs; i++) {
      if (col0 + i < grid.colCount) {
        result[col0 + i].group = cell.text || '';
      }
    }
    col0 += cs;
  }

  // Row 1 子表头（若存在）
  if (grid.rows.length > 1 && grid.rows[1].some((c) => c.isHeader)) {
    const needsSub: number[] = [];
    let cIdx = 0;
    for (const cell of grid.rows[0]) {
      const cs = cell.colSpan || 1;
      const rs = cell.rowSpan || 1;
      if (rs === 1) {
        for (let i = 0; i < cs; i++) needsSub.push(cIdx + i);
      }
      cIdx += cs;
    }

    let subIdx = 0;
    for (const cell of grid.rows[1]) {
      const cs = cell.colSpan || 1;
      for (let i = 0; i < cs; i++) {
        if (subIdx < needsSub.length) {
          const col = needsSub[subIdx];
          if (col < grid.colCount) {
            result[col].sub = cell.text || '';
          }
          subIdx++;
        }
      }
    }
  }

  return result;
}

/**
 * 获取表单与指标对应的典型集团抵消比例与口径
 */
function getEliminationFactor(formCode: string, colSub: string, colGroup: string): number {
  const text = `${colGroup} ${colSub}`;
  
  // 单价、比例、毛利率、完工率、天数等不属于金额加总抵消
  if (/单价|比率|率|%|天数|人数|工时|单耗/.test(text)) {
    return 0;
  }

  // BB.1.3 技术服务：物料加成抵消与内部服务收入抵消
  if (formCode.startsWith('BB.1.3')) {
    if (/物料成本|直接物料/.test(text)) return 0.085; // 兄弟公司供料加成率约 8.5%
    if (/确认收入|服务收入/.test(text)) return 0.06;  // 内部服务协同收入约 6%
    if (/预收|回款|现金/.test(text)) return 0.05;      // 内部往来清算
    if (/其他费用/.test(text)) return 0.04;
    return 0.05;
  }

  // BB.3.1 / BB.3.3 采购预算：关联代采购平价双侧转移抵消
  if (formCode.startsWith('BB.3.1') || formCode.startsWith('BB.3.3')) {
    if (/到货额|采购额|到货/.test(text)) return 0.12; // 代采购转移额约占 12%（下单主体与受益主体双计需抵消）
    if (/付款|预付|验收/.test(text)) return 0.08;
    return 0.08;
  }

  // BB.1.1 / BB.1.2 销售预算：内部设备调拨与转售抵消
  if (formCode.startsWith('BB.1.1') || formCode.startsWith('BB.1.2')) {
    if (/签约额|销售额|确认收入|收入/.test(text)) return 0.065; // 内部销售抵消
    if (/回款|预收/.test(text)) return 0.05;
    return 0.05;
  }

  // BB.2.1 生产制造：跨法人代工
  if (formCode.startsWith('BB.2.1')) {
    if (/完工生产成本|生产成本/.test(text)) return 0.07;
    return 0.04;
  }

  // BB.3.X 存货平衡：代采购物料转出与转入双侧对冲、内部存货未实现加成消除
  if (formCode.startsWith('BB.3.X')) {
    if (/转入|转出/.test(text)) return 0.10;
    if (/期末|期初/.test(text)) return 0.03; // 未实现毛利抵消
    return 0.05;
  }

  // BB.5 费用与人工：跨法人人员借调与管理服务费
  if (formCode.startsWith('BB.5')) {
    if (/费用|制造费用|管理费用|工时/.test(text)) return 0.05;
    return 0.03;
  }

  // 默认金额列抵消因子
  return 0.05;
}

/**
 * 获取表单专属的单体与集团视角差异解析说明
 */
export function getFormDifferenceNotes(formCode: string): EliminationDifferenceNotes {
  if (formCode.startsWith('BB.1.3')) {
    return {
      singleEntity: '单体公司视角：签约主体法人与提供方法人各自独立核算。提供方确认 6001.2 内部技术服务收入与 6401.2 成本；签约主体按采购价入库存货（含兄弟公司加成），随后随服务消耗结转 6401.1 服务物料成本。',
      elimination: '合并抵消额：在集团合并底稿中，双侧全额对冲提供方的内部销售收入（借：6001.2）与签约主体的内部采购物料成本及期末存货未实现加成（贷：6401.2 / 1405 内部加成款）。',
      consolidated: '集团合并视角：消除内部购销重复计算与未实现内部毛利，仅保留技术服务直接消耗的外部物料真实出库成本与对外真实销售收入，利润表还原为集团真实毛利。',
      entryRule: '借：营业收入—内部关联销售 (6001.2)；贷：营业成本—内部关联采购 (6401.2) / 存货—内部未实现加成 (1405)',
      cashFlowImpact: '内部交易通过 1221/2241 往来结算，不发生外部现金收付；合并现金流量表（BO.CF）仅计对外真实收付款（CF-01）。',
      relevantForms: [
        { code: 'BB.1.3.f', name: '物料明细_财务查询（内部供应商）' },
        { code: 'BJ.C.a', name: '关联交易收入成本总览' },
        { code: 'BB.3.X', name: '存货预算平衡表' },
      ],
    };
  }

  if (formCode.startsWith('BB.3.1') || formCode.startsWith('BB.3.3')) {
    return {
      singleEntity: '单体公司视角：下单主体（管理单元关联法人 A）代受益主体（法人 B）采购。法人 A 单体报表记录到货额与采购发票；随后平价转移至法人 B，法人 B 单体报表确认到货入库，两公司单体采购额加总存在双重到货统计。',
      elimination: '合并抵消额：抵消代采购转移额（BB.3.3.D / BB.3.1.D），冲减下单主体转出与受益主体转入的双侧对冲金额，同时抵消 6001.2 代采加成（若有）与 6602 管理费用。',
      consolidated: '集团合并视角：对外采购总规模仅反映集团对外部供应商的一次真实采购到货，彻底剔除内部代采购平价流转的双计影响。',
      entryRule: '双侧平价对冲：借：其他应付款 (2241)；贷：其他应收款 (1221)；内部代采手续费加成冲销：借：6001.2 / 贷：6602',
      cashFlowImpact: '代付款项属于内部资金划拨，集团合并层面仅反映对外部设备/物料供应商的实际支付现金流（CF-05）。',
      relevantForms: [
        { code: 'BB.3.3.D', name: '关联交易视角（物料代采购）' },
        { code: 'BB.3.1.D', name: '关联交易视角（设备代采购）' },
        { code: 'BJ.C.d', name: '内部代采购平价转移抵销表' },
      ],
    };
  }

  if (formCode.startsWith('BB.1.1') || formCode.startsWith('BB.1.2')) {
    return {
      singleEntity: '单体公司视角：各法人销售团队分别填报各自签署的销售合同与软硬件订单，含部分面向集团内部其他公司的设备配属与自用转售合同。',
      elimination: '合并抵消额：剔除集团内部法人之间的设备内部调拨、软件内部授权及关联采购，消除内部毛利与未实现损益。',
      consolidated: '集团合并视角：仅统计集团面向外部真实商业客户的签约额与销售收入，直出合并利润表营业收入（6001.1）。',
      entryRule: '借：主营业务收入 (6001.2 内部销售)；贷：主营业务成本 (6401.2 内部销售成本) / 存货/固定资产 (内部未实现损益)',
      cashFlowImpact: '内部回款经 1221/2241 抵扣，合并现金流量表仅包含外部客户真实预收与验收回款（CF-01）。',
      relevantForms: [
        { code: 'BB.1.2.c', name: '销售预算财务视角' },
        { code: 'BJ.C.a', name: '关联交易收入成本总览' },
        { code: 'BO.PL', name: '利润表（营业收入）' },
      ],
    };
  }

  if (formCode.startsWith('BB.3.X')) {
    return {
      singleEntity: '单体公司视角：各法人按「法人公司×存货类别」逐行填报期初数、到货入库、生产领用转出与期末结存，包含代采购物料的单体转入与转出。',
      elimination: '合并抵消额：下单主体法人该类别转出与受益主体法人同类别平价转入双侧对冲抵消，同时剔除兄弟公司间存货流转的未实现加成。',
      consolidated: '集团合并视角：集团存货期末余额（1405）仅保留外部真实采购入库及真实生产消耗形成的存货净额，不因内部调拨而膨胀。',
      entryRule: '借：存货—未实现内部利润抵消；贷：主营业务成本 / 资产减值损失',
      cashFlowImpact: '存货内部形态转换不产生现金收支，资产负债表存货项目反映集团对外净额。',
      relevantForms: [
        { code: 'BB.3.X.b', name: '存货预算平衡表（财务视角）' },
        { code: 'BO.BS', name: '资产负债表（存货 1405）' },
      ],
    };
  }

  // 默认通用预算编制表
  return {
    singleEntity: '单体公司视角：纳入预算编制的各法人子公司按独立会计主体填报，包含跨主体发生的关联业务往来、内部结算及加成。',
    elimination: '合并抵消额：在集团合并报表底稿中，双侧冲销关联方内部交易、内部服务费用分摊及内部未实现利润，防止合并报表规模虚增。',
    consolidated: '集团合并视角：将整个集团视为单一会计主体，仅反映与外部独立第三方的真实交易，作为集团最终三表（PL/BS/CF）的预算输出基准。',
    entryRule: '双侧对冲内部购销、劳务与往来科目（借贷同额冲销，消除内部交易未实现损益）。',
    cashFlowImpact: '内部结算不计入合并现金流量表，合并现金流仅核算对外现金收支。',
    relevantForms: [
      { code: 'BJ.C', name: '关联交易与内部抵销' },
      { code: 'BO.PL', name: '预算输出利润表' },
      { code: 'BO.BS', name: '预算输出资产负债表' },
    ],
  };
}

/**
 * 核心计算函数：根据表单数据动态生成【单体汇总行】、【合并抵消额行】、【集团合并净额行】
 */
export function calculateEliminationRows(grid: MarkdownTableGrid, formCode: string = ''): EliminationResult | null {
  if (!grid.rows || grid.rows.length === 0 || grid.wrap) return null;

  // 区分表头行与数据行
  const isHeaderRow = (row: MarkdownTableCell[]) => row.some((c) => c.isHeader);
  const dataRows = grid.rows.filter((r) => !isHeaderRow(r));
  if (dataRows.length === 0) return null;

  const headerInfo = getColumnHeaderInfo(grid);

  let totalSumAll = 0;
  let totalElimAll = 0;
  let hasNumericData = false;

  const singleCells: MarkdownTableCell[] = [];
  const elimCells: MarkdownTableCell[] = [];
  const consCells: MarkdownTableCell[] = [];

  // 扫描每一列
  for (let c = 0; c < grid.colCount; c++) {
    const colMeta = headerInfo[c] || { group: '', sub: '' };
    const headerText = `${colMeta.group} ${colMeta.sub}`;
    const isRateOrPrice = /单价|比率|率|%|天数|人数|工时/.test(headerText);

    // 收集该列所有数据行数值
    let count = 0;
    let numCount = 0;
    let sum = 0;
    const values: number[] = [];

    for (const r of dataRows) {
      const cell = r[c];
      if (!cell || cell.text === undefined || cell.text === '') continue;
      count++;
      const clean = String(cell.text).replace(/,/g, '').trim();
      const num = Number(clean);
      if (!isNaN(num) && clean !== '') {
        numCount++;
        sum += num;
        values.push(num);
      }
    }

    const isNumericCol = count > 0 && numCount / count >= 0.5;

    if (!isNumericCol) {
      // 维度文本列
      if (c === 0) {
        singleCells.push({ text: '【单体公司汇总】', isHeader: false, rowSpan: 1, colSpan: 1 });
        elimCells.push({ text: '【集团合并抵消】', isHeader: false, rowSpan: 1, colSpan: 1 });
        consCells.push({ text: '【集团合并净额】', isHeader: false, rowSpan: 1, colSpan: 1 });
      } else if (c === 1) {
        singleCells.push({ text: '各法人独立核算', isHeader: false, rowSpan: 1, colSpan: 1 });
        elimCells.push({ text: '内部交易/加成剔除', isHeader: false, rowSpan: 1, colSpan: 1 });
        consCells.push({ text: '集团对外并表口径', isHeader: false, rowSpan: 1, colSpan: 1 });
      } else {
        singleCells.push({ text: '—', isHeader: false, rowSpan: 1, colSpan: 1 });
        elimCells.push({ text: '—', isHeader: false, rowSpan: 1, colSpan: 1 });
        consCells.push({ text: '—', isHeader: false, rowSpan: 1, colSpan: 1 });
      }
    } else {
      hasNumericData = true;

      if (isRateOrPrice) {
        // 单价或比率列，计算加权平均或保留原均值，抵消列显示 —
        const avg = values.length > 0 ? sum / values.length : 0;
        const avgText = avg.toFixed(1);
        singleCells.push({ text: avgText, isHeader: false, rowSpan: 1, colSpan: 1 });
        elimCells.push({ text: '—', isHeader: false, rowSpan: 1, colSpan: 1 });
        consCells.push({ text: avgText, isHeader: false, rowSpan: 1, colSpan: 1 });
      } else {
        // 金额或数量列，执行精准抵消测算
        const factor = getEliminationFactor(formCode, colMeta.sub, colMeta.group);
        const elim = Math.round(sum * factor * 10) / 10;
        const net = Math.round((sum - elim) * 10) / 10;

        // 若为全年合计列或主要总额列，纳入统计摘要
        if (colMeta.group.includes('全年合计') || !colMeta.group.includes('月')) {
          totalSumAll += sum;
          totalElimAll += elim;
        }

        singleCells.push({ text: sum.toFixed(1), isHeader: false, rowSpan: 1, colSpan: 1 });
        elimCells.push({
          text: elim > 0 ? `-${elim.toFixed(1)}` : '0.0',
          isHeader: false,
          rowSpan: 1,
          colSpan: 1,
        });
        consCells.push({ text: net.toFixed(1), isHeader: false, rowSpan: 1, colSpan: 1 });
      }
    }
  }

  // 兜底：若全年合计未识别，累加首几个数值列
  if (totalSumAll === 0 && hasNumericData) {
    for (let c = 0; c < grid.colCount; c++) {
      const clean = Number(singleCells[c]?.text);
      if (!isNaN(clean) && clean > 0) {
        totalSumAll += clean;
        const elimClean = Math.abs(Number(elimCells[c]?.text) || 0);
        totalElimAll += elimClean;
      }
    }
  }

  const totalSumRound = Math.round(totalSumAll * 10) / 10;
  const totalElimRound = Math.round(totalElimAll * 10) / 10;
  const totalNetRound = Math.round((totalSumRound - totalElimRound) * 10) / 10;
  const elimRate = totalSumRound > 0 ? ((totalElimRound / totalSumRound) * 100).toFixed(1) : '0.0';

  return {
    singleEntityRow: singleCells,
    eliminationRow: elimCells,
    consolidatedRow: consCells,
    summary: {
      totalSum: totalSumRound,
      totalElim: totalElimRound,
      totalNet: totalNetRound,
      elimRateText: `${elimRate}%`,
      hasNumericData,
    },
    differenceNotes: getFormDifferenceNotes(formCode),
    hasNumericData,
  };
}
