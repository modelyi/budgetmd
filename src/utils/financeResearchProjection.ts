import type { BudgetFieldDef } from '../data/budgetFormRegistry';
import type { MarkdownTableCell, MarkdownTableGrid } from './markdownTableConverter';

// 仅调研页使用：共享表样与字段登记保持原样，不接演示或计算引擎。
const cell = (text: string, isHeader = false): MarkdownTableCell => ({ text, isHeader, rowSpan: 1, colSpan: 1 });
const amount = (text: string) => Number(text.replace(/[¥,，]/g, ''));
const format = (value: number) => value.toLocaleString('zh-CN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** 在两行合并表头上找实际列位，不依赖历史列号。 */
function headerColumns(grid: MarkdownTableGrid): Map<string, number[]> {
  const result = new Map<string, number[]>();
  const occupied = new Set<number>();
  grid.rows.slice(0, 2).forEach((row, r) => {
    let c = 0;
    row.forEach(h => {
      while (r === 1 && occupied.has(c)) c++;
      result.set(h.text, [...(result.get(h.text) ?? []), c]);
      if (r === 0 && h.rowSpan === 2) for (let i = 0; i < h.colSpan; i++) occupied.add(c + i);
      c += h.colSpan;
    });
  });
  return result;
}

export function staticPayback(capital: number, annualReturn: number): number | null {
  return Number.isFinite(capital) && Number.isFinite(annualReturn) && capital > 0 && annualReturn > 0
    ? Math.round(capital / annualReturn * 10) / 10 : null;
}

export function projectFinanceResearchGrids(formCode: string, source: MarkdownTableGrid[]): MarkdownTableGrid[] {
  if (formCode !== 'BF.1' && formCode !== 'BF.3') return source;
  return source.map(original => {
    const code = original.name.split(' ')[0];
    if (!['BF.1', 'BF.3.c', 'BF.3.d'].includes(code)) return original;
    const grid = { ...original, rows: original.rows.map(row => row.map(c => ({ ...c }))) };
    const columns = headerColumns(original);
    const col = (name: string) => {
      const found = columns.get(name)?.[0];
      if (found === undefined) throw new Error(`调研表样缺少既有表头：${name}`);
      return found;
    };
    if (code === 'BF.1') {
      grid.rows[1].forEach(h => { if (h.text === '累计分红/利息') h.text = '本年累计分红/利息'; });
      const guide = grid.rows[2];
      const guidance: Record<string, string> = {
        '项目投资总额': '按项目整体投资计划填报；不强制等于己方出资额+合伙人投入资本',
        '己方投资比例': '按投资协议填报，不强制按出资额比例计算',
        '合伙人投入资本': '其他股东/合伙人约定投入的资本，不代表项目全部资金来源',
        '累计分红/利息': '本年累计=1~12月分红/利息收现之和，不含以前年度',
        '预计每年收益': '预计归属于我司的年度收益，非被投企业全额利润；不等于当年现金分红',
        '资本回收周期': '单位：年。稳定可收现收益假设下，己方出资额÷预计每年收益；非正收益或不适用时不计算',
      };
      Object.entries(guidance).forEach(([name, text]) => { guide[col(name)].text = text; });
      grid.rows.forEach(row => row.forEach(c => {
        if (c.text.includes('若为长期金融工具')) c.text = '股权投资付款计入长期股权投资及投资活动现金流出；金融工具投资另在 BF.3 编制，不在本表重复登记。';
      }));
      // 本表目前为留空表样；若以后恢复示例，只修正本年累计及静态参考显示。
      grid.rows.slice(3).forEach(row => {
        if (row.length !== grid.colCount || !row[col('投资对象')]?.text) return;
        row[col('累计分红/利息')].text = row[columns.get('分红/利息收现')![0]].text;
        const payback = staticPayback(amount(row[col('己方出资额')].text), amount(row[col('预计每年收益')].text));
        row[col('资本回收周期')].text = payback === null ? '不适用' : format(payback);
      });
    }
    if (code === 'BF.3.c') {
      const monthStarts = Array.from({ length: 12 }, (_, m) => col(`【${m + 1}月】`));
      const annualNew = col('新增融资金额');
      const annualRepay = col('减少');
      grid.rows[0].forEach(h => {
        if (/^【\d+月】$/.test(h.text)) h.colSpan += 2;
        if (h.text === '新增融资金额') h.text = '全年新增融资金额';
        if (h.text === '减少') h.text = '全年偿还本金';
      });
      let feeTypeHeaders = 0;
      grid.rows[1] = original.rows[1].flatMap(h => {
        // 第一个费用类型属于全年组，其后每个费用类型是对应月份的起点。
        const start = h.text === '融资费用类型' && feeTypeHeaders++ > 0;
        const text = h.text.replace('应付利息', '计提利息');
        return [...(start ? [cell('新增融资金额', true), cell('偿还本金', true)] : []), { ...h, text }];
      });
      grid.rows = grid.rows.map((row, r) => {
        if (r < 2) return row;
        if (row.length === original.colCount) {
          if (r === 2) {
            row[annualNew].text = '=SUM(1~12月新增融资金额)，不重复录入';
            row[annualRepay].text = '=SUM(1~12月偿还本金)，不重复录入';
            row[col('应付利息合计')].text = '本年计提发生额合计；不是应付未付余额';
            row[col('融资费用')].text = '保留原费用口径；与计提利息不重复归集';
          }
          return row.flatMap((c, index) => [
            ...(monthStarts.includes(index) ? [cell(r === 2 ? '按实际提款月份填报（万元）' : ''), cell(r === 2 ? '按还本月份填报；不含利息（万元）' : '')] : []), c,
          ]);
        }
        return row.map(c => c.colSpan === original.colCount ? { ...c, colSpan: c.colSpan + 24, text: '编制说明：按法人公司逐笔编制月度新增融资、偿还本金、计提利息与实付利息。年度新增/还本及利息合计取月度汇总，不重复录入；计提利息为当月发生额，实付利息为当月支付额。融资费用与利息不得重复归集；费用化/资本化按既有融资费用类型区分。' } : c);
      });
      grid.colCount += 24;
    }
    if (code === 'BF.3.d') {
      grid.rows[1].forEach(h => { if (h.text === '当期减少融资总额') h.text = '当期偿还本金总额'; });
      grid.rows.forEach(row => row.forEach(c => {
        if (c.colSpan === grid.colCount && c.text) c.text = '汇总口径：按融资主体(法人公司)+筹资产品对应融资类型，将 BF.3.c 同月新增融资、偿还本金分别汇总；计提利息按费用类型分别归入资本化/费用化融资费用，不取实付利息、不累加应付未付余额。当期流动性重分类金额按到期日自动识别（依据 BF.3.c 每笔融资的期限/到期时间，判定剩余到期日落入预算年度内的长期借款本金：取该笔「已有期初净额（上年末余额）」中属长期的部分，扣除已列入当年偿还本金的部分，按融资主体(法人公司)+筹资产品维度按月归集），系统带出、不可手工填；该金额不产生现金流、不改变负债合计，报表落点为 BO.BS「2504 一年内到期的非流动负债 (+) / 2501 长期借款 (−)」同额，不与「偿还本金」（CF-20 真实付现）混用。其他融资费用的月度归属待确认。不在本表重复填报或重复生成分录。';
      }));
    }
    return grid;
  });
}

const field = (formCode: string, fieldCode: string, fieldName: string, remark: string, inputMode: BudgetFieldDef['inputMode'] = '手工', source = '本表录入', dataType: BudgetFieldDef['dataType'] = 'number'): BudgetFieldDef => ({ formCode, fieldCode, fieldName, remark, inputMode, source, dataType, required: false });

/** 仅调研字段投影；保留共享稳定键，不回写共享登记。 */
export function financeResearchFields(formCode: string, existing: BudgetFieldDef[]): BudgetFieldDef[] | undefined {
  const f = (key: string, name: string, remark: string, mode: BudgetFieldDef['inputMode'] = '手工', source = '本表录入', type: BudgetFieldDef['dataType'] = 'number') => field(formCode, key, name, remark, mode, source, type);
  const original = (key: string, name: string, remark = '') => ({ ...(existing.find(f => f.fieldCode === key) ?? f(key, name, remark, '手工', '本表录入', 'string')), fieldName: name, remark });
  if (formCode === 'BF.1') return [
    original('legalEntity', '法人公司', '投资主体（出资法人），投资及现金流按该法人归集'),
    f('industry', '被投资企业所属行业', '保留行业分类', '选择', 'AB.2 国资委行业字典', 'select'),
    original('targetCompany', '投资对象'),
    f('region', '投资区域', '市内/境内市外/海外', '选择', '本表录入', 'select'),
    f('startDate', '项目启动时间 (年月)', '按项目计划填报年月', '手工', '本表录入', 'string'),
    f('endDate', '预计结束时间 (年月)', '按项目计划填报年月', '手工', '本表录入', 'string'),
    f('totalProjectInvestment', '项目投资总额', '项目整体投资计划，可能包括资本金以外资金；不得无条件等于己方出资额+合伙人投入资本'),
    f('ourShareholdingRatio', '己方投资比例', '按投资协议填报；不强制等于己方出资额占资本金或总投资的比例'),
    f('ourCapitalContribution', '己方出资额', '我司约定出资金额，与本年实际计划付款分开'),
    f('partnerCapital', '合伙人投入资本', '其他股东/合伙人约定投入的资本，不代表项目全部资金来源'),
    f('priorYearCumulatedInvestment', '至上年末累计投入', '我司截至上年末累计投入金额'),
    f('yearEndCumulatedInvestment', '累计投资金额', '截至本年末=至上年末累计投入+全年投资金额', '公式', '本表公式'),
    f('yearEndCumulatedDividend', '本年累计分红/利息', '=SUM(1~12月分红/利息收现)，不含以前年度；原列改为本年口径，不新增历史数据入口', '公式', '本表公式'),
    f('yearEndEquityRatio', '持股比例-股权投', '预计本年末按协议持有的股权比例'),
    f('annualReturn', '预计每年收益', '预计归属于我司的年度收益（非被投企业全额利润）；不强行等于当年现金分红'),
    f('paybackPeriod', '资本回收周期', '单位年。仅在稳定可收现收益假设下作简化静态参考：己方出资额÷预计每年收益（1位小数）；收益≤0或假设不适用时留空/不适用，不得为0年或除零', '公式', '本表公式'),
    f('investmentMonths', '月度投资金额', '按月填报我司投资付款额，单位万元'),
    f('dividendMonths', '分红/利息收现', '按预计收现月份填报我司收款额；收益确认与收现不默认相等'),
    f('annualInvestmentTotal', '全年投资合计', '=SUM(1~12月投资金额)', '公式', '本表公式'),
    f('annualDividendTotal', '全年分红/利息收现合计', '=SUM(1~12月分红/利息收现)', '公式', '本表公式'),
  ];
  if (formCode === 'BF.3.c') return [
    ...existing.map(x => {
      if (x.fieldCode === 'newFinancing') return { ...x, fieldName: '全年新增融资金额', inputMode: '公式' as const, source: '本表月度汇总', remark: '=SUM(1~12月新增融资金额)，不重复录入' };
      if (x.fieldCode === 'decrease') return { ...x, fieldName: '全年偿还本金', inputMode: '公式' as const, source: '本表月度汇总', remark: '=SUM(1~12月偿还本金)，不含利息、不重复录入' };
      if (x.fieldCode === 'openingNet') return { ...x, remark: '上年末未偿还本金余额，不含应付未付利息' };
      if (x.fieldCode === 'financingFee') return { ...x, remark: '保留原融资费用字段，不与计提利息重复归集；费用构成及分月归属待确认，不自动重复加总' };
      return x;
    }),
    f('feeType', '融资费用类型', '费用化/资本化；各月按实际预算归属选择，年度类型不作数值求和', '选择', '本表录入', 'select'),
    f('annualInterestPayable', '计提利息合计', '=SUM(1~12月计提利息)，是本年发生额，不是未付余额之和', '公式', '本表公式'),
    f('annualInterestPaid', '实付利息合计', '=SUM(1~12月实付利息)', '公式', '本表公式'),
    f('monthlyNewFinancing', '月度新增融资金额', '按实际提款月份填报本金流入，单位万元'),
    f('monthlyRepayment', '月度偿还本金', '按预计还本月份填报本金流出，不含利息，单位万元'),
    f('interestPayable', '月度计提利息', '本期计提发生额，按本金、利率及计息期间测算；费用化/资本化分别归集，不得填应付未付余额'),
    f('interestPaid', '月度实付利息', '按付息计划填报本月支付额；允许与计提利息不同，不重复计入费用'),
    f('notes', '备注', '补充预算假设或差异说明', '手工', '本表录入', 'string'),
  ];
  if (formCode === 'BF.3.d') return [
    ...existing.filter(x => x.fieldCode !== 'monthlyAmount').map(x => ({ ...x, inputMode: '系统带出' as const, source: 'BF.3.c 融资预算明细表', remark: '按同一法人及融资类型/产品对应关系汇总，不在本表重复录入' })),
    f('monthlyNewFinancing', '当期新增融资总额', '取 BF.3.c 同月新增融资金额；全年=各月之和', '系统带出', 'BF.3.c 月度新增融资金额'),
    f('monthlyRepayment', '当期偿还本金总额', '取 BF.3.c 同月偿还本金；不含利息，全年=各月之和', '系统带出', 'BF.3.c 月度偿还本金'),
    f('capitalizedFee', '资本化融资费用', '取 BF.3.c 资本化类型的当月计提利息；其他融资费用分月口径待确认，不混入实付利息', '系统带出', 'BF.3.c 计提利息/融资费用类型'),
    f('expensedFee', '费用化融资费用', '取 BF.3.c 费用化类型的当月计提利息；其他融资费用分月口径待确认，不累加应付未付余额', '系统带出', 'BF.3.c 计提利息/融资费用类型'),
    f('liquidityReclassification', '当期流动性重分类金额', '系统带出（按到期日自动识别，不可手工填）：按 BF.3.c 每笔融资的期限/到期时间判定剩余到期日落入预算年度内的长期借款本金（取该笔「已有期初净额（上年末余额）」中属长期的部分、扣除已列入当年偿还本金的部分），按融资主体(法人公司)+筹资产品维度按月归集；不产生现金流、不改变负债合计，报表落点为 BO.BS 2504 一年内到期的非流动负债 (+) / 2501 长期借款 (−) 同额，不与「偿还本金」（CF-20 真实付现）混用', '系统带出', 'BF.3.c 融资预算明细表·期限/到期时间、已有期初净额（上年末余额）'),
  ];
  if (formCode === 'BJ.C.f') return [
    original('direction', '借款方向', '下拉（借入/借出）；本列决定分录路由、无第二种走法——借入方进 2241.1/6604.1/CF-18/CF-20/CF-21，借出方进 1221.1/6001.2/CF-22.1/CF-19.2'),
    original('legalEntity', '本方法人', 'AA.2 法人组织架构取值；本表按本方法人编制，三表落点按本方法人归集'),
    original('counterpartyEntity', '对手方法人', 'AA.2 法人组织架构取值；集团合并层按「本方法人 + 对手方法人」配对互抵（1221.1↔2241.1、6001.2↔6604.1、现金流收付对冲）'),
    original('interestRate', '利率', '内部借款约定年利率；月度利息=本金×利率÷12'),
    original('termMonths', '期限（月）', '单位：月；与到期时间配套登记'),
    original('maturityDate', '到期时间', '内部借款到期时间（如 2027-12-31）'),
    original('openingNet', '期初净额', '上年末未偿还内部借款本金余额，不含应付未付利息'),
    f('monthlyNewAmount', '当月新增', '按月填报；借入方=提款流入、借出方=放款流出；【全年合计】=SUM(1~12月)，不重复录入'),
    f('monthlyRepayment', '当月还本', '按月填报；借入方=还本流出、借出方=收本流入；不含利息，【全年合计】=SUM(1~12月)'),
    f('interestPayable', '当月计提利息', '本期计提发生额（非应付未付余额）；借入方进 6604.1 其中：利息费用、借出方（收息）进 6001.2 其他业务收入-内部往来'),
    f('interestPaid', '当月实付利息', '按付息计划填报、可与计提利息不同额；借入方=付息付现（CF-21）、借出方=当月实收利息（CF-19.2）'),
    f('financingFee', '融资费用', '手续费类登记额；统一费用化进 6604，不与计提利息、实付利息重复归集'),
    original('notes', '备注', '补充内部借款的预算假设或差异说明'),
  ];
  if (formCode === 'BF.3.a' || formCode === 'BF.3.b') {
    const bank = formCode === 'BF.3.a';
    return [
      f('investmentEntity', '投资主体', '保留原投资主体维度', '选择', '本表录入', 'select'),
      f('instrumentType', '投资类型', '按现有投资分类填报，不按融资提款填报', '选择', '本表录入', 'select'),
      f('investmentProduct', '投资产品', '保留原投资产品维度', '选择', '本表录入', 'select'),
      f(bank ? 'bankName' : 'projectName', bank ? '银行名称' : '项目名称', '保留原业务信息', '手工', '本表录入', 'string'),
      ...(bank ? [f('interestRate', '利率%', '保留原利率口径，不按月相加')] : [
        f('priorAverageCapital', '上年平均资金占用额', '上年度预算情况，年度单列，不按月相加'),
        f('priorReturnRate', '上年投资回报率%', '上年度预算情况，年度单列'),
        f('priorEndingInvestment', '上年期末投资额', '上年期末存量金额，不是本年新增投资'),
      ]),
      f('newInvestment', '新增投资额', '各月新增投资本金；全年=各月之和'),
      f('reductionInvestment', '减少投资额', '各月减少投资本金；与收益分开，全年=各月之和'),
      ...(!bank ? [f('endingInvestment', '期末投资额', '时点余额，全年取年末数，不得将各月余额相加')] : []),
      f('investmentIncome', '投资收益', bank
        ? '本期确认收益。本表未单设收益收现列，不扩列；仅在明确确认与收现同期同额假设下共用，差额可在三表手工调整列录入，避免重复计入'
        : '本期确认收益，不强制等于计划分红/利息；全年=各月确认额之和'),
      ...(!bank ? [
        f('dividendCash', '计划分红/利息', '预计本期收现金额，全年为「本年计划分红/利息流入」；不以投资收益替代'),
        f('capitalOccupied', '资金占用额', '各月占用金额；全年平均资金占用额按期间加权，不按月简单求和'),
      ] : []),
      f('returnRate', bank ? '回报率% / 平均回报率%' : '回报率% / 投资回报率%', '保留原回报率字段，年度比率不按各月相加'),
      f('notes', '备注', '说明确认收益与收现的预算假设及差额处理', '手工', '本表录入', 'string'),
    ];
  }
  return undefined;
}
