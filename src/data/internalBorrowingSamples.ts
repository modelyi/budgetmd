import type { InternalBorrowingItem, InternalBorrowingMonthlyDetail } from '../types';

// ----------------------------------------------------------------------
// BJ.C.f 内部借款预算表 示例数据（融资类型固定 XYZ-16 内部借款，不设「融资类型」列）
// 两行成对示例：1 行借入方 + 1 行借出方（同额同月，便于演示集团合并层「本方法人 + 对手方法人」配对互抵）。
// 法人名一律取 AA.2 法人组织架构现有法人；金额为虚构演示值，不追求与其它业务表勾稽。
// ----------------------------------------------------------------------

function makeInternalBorrowingMonths(
  plan: Partial<Record<number, Partial<InternalBorrowingMonthlyDetail>>>
): InternalBorrowingItem['months'] {
  const months: InternalBorrowingItem['months'] = {};
  for (let m = 1; m <= 12; m++) {
    const p = plan[m] || {};
    months[`m${m}`] = {
      newAmount: p.newAmount ?? 0,
      repayment: p.repayment ?? 0,
      interestPayable: p.interestPayable ?? 0,
      interestPaid: p.interestPaid ?? 0,
      financingFee: p.financingFee ?? 0,
    };
  }
  return months;
}

/** 成对示例：3 月提款/放款 3000，12 月还本/收本 1000，4~12 月按月计提利息 8.8（3000×3.5%÷12），6 月与 12 月各收付利息一次。 */
export const INTERNAL_BORROWING_SAMPLE: InternalBorrowingItem[] = [
  {
    id: 'internal-borrowing-01',
    seq: 1,
    direction: '借入',
    legalEntity: '草莓慕斯公司',
    counterpartyEntity: '甜甜圈集团公司',
    interestRate: 0.035,
    termMonths: 12,
    maturityDate: '2027-12-31',
    openingNetBalance: 0,
    months: makeInternalBorrowingMonths({
      3: { newAmount: 3000 },
      4: { interestPayable: 8.8 }, 5: { interestPayable: 8.8 }, 6: { interestPayable: 8.8, interestPaid: 26.3 },
      7: { interestPayable: 8.8 }, 8: { interestPayable: 8.8 }, 9: { interestPayable: 8.8 },
      10: { interestPayable: 8.8 }, 11: { interestPayable: 8.8 }, 12: { repayment: 1000, interestPayable: 8.8, interestPaid: 52.5 },
    }),
    notes: '借入方口径：3 月提款 3000 进其他应付款-内部往来 2241.1，12 月还本 1000、4~12 月按月计提利息进 6604.1 其中：利息费用。',
  },
  {
    id: 'internal-borrowing-02',
    seq: 2,
    direction: '借出',
    legalEntity: '甜甜圈集团公司',
    counterpartyEntity: '草莓慕斯公司',
    interestRate: 0.035,
    termMonths: 12,
    maturityDate: '2027-12-31',
    openingNetBalance: 0,
    months: makeInternalBorrowingMonths({
      3: { newAmount: 3000 },
      4: { interestPayable: 8.8 }, 5: { interestPayable: 8.8 }, 6: { interestPayable: 8.8, interestPaid: 26.3 },
      7: { interestPayable: 8.8 }, 8: { interestPayable: 8.8 }, 9: { interestPayable: 8.8 },
      10: { interestPayable: 8.8 }, 11: { interestPayable: 8.8 }, 12: { repayment: 1000, interestPayable: 8.8, interestPaid: 52.5 },
    }),
    notes: '借出方口径：3 月放款 3000 进其他应收款-内部往来 1221.1（CF-22.1），12 月收本 1000、收息 52.5（CF-19.2），4~12 月按月计提利息进 6001.2 其他业务收入-内部往来。',
  },
];
