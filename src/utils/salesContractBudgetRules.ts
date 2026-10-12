import type { BudgetItem, MonthlyBudget } from '../types';

export const SALES_CONTRACT_NATURE_OPTIONS = ['存量框架合同', '新增商业机会'] as const;
export type SalesContractNature = typeof SALES_CONTRACT_NATURE_OPTIONS[number];

export type SalesContractBudgetRow = {
  contractNature: string;
  customer: string;
  projectName: string;
  budgetProduct: string;
  region: string;
  department: string;
  legalEntity: string;
  productCategory: string;
  revenueMethod: string;
  internalSupplier?: string;
  months: MonthlyBudget;
  nextYearBudget: number;
  yearAfterNextBudget: number;
  annualTotal?: number;
};

export type SalesContractValidationError = {
  field: string;
  message: string;
  level: 'error' | 'warning';
};

const REQUIRED_FIELDS: Array<keyof SalesContractBudgetRow> = [
  'contractNature', 'customer', 'projectName', 'budgetProduct',
  'region', 'department', 'legalEntity', 'productCategory', 'revenueMethod',
];

const LEGACY_NATURE_MAP: Record<string, SalesContractNature> = {
  存量: '存量框架合同',
  历史框架合同: '存量框架合同',
  新增: '新增商业机会',
  新增机会点: '新增商业机会',
};

export function normalizeSalesContractBudget(row: Partial<SalesContractBudgetRow> & Partial<BudgetItem>): SalesContractBudgetRow & { annualTotal: number } {
  const months = {} as MonthlyBudget;
  for (let month = 1; month <= 12; month += 1) {
    const value = row.months?.[`m${month}` as keyof MonthlyBudget];
    months[`m${month}` as keyof MonthlyBudget] = typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : 0;
  }
  const contractNature = LEGACY_NATURE_MAP[row.contractNature ?? ''] ?? row.contractNature ?? '';
  const nextYearBudget = numericAmount(row.nextYearBudget);
  const yearAfterNextBudget = numericAmount(row.yearAfterNextBudget);
  return {
    contractNature,
    customer: row.customer ?? '',
    projectName: row.projectName ?? '',
    budgetProduct: row.budgetProduct ?? '',
    region: row.region ?? '',
    department: row.department ?? '',
    legalEntity: row.legalEntity ?? row.signingEntity ?? '',
    productCategory: row.productCategory ?? '',
    revenueMethod: row.revenueMethod ?? '',
    internalSupplier: row.internalSupplier ?? '',
    months,
    nextYearBudget,
    yearAfterNextBudget,
    annualTotal: Object.values(months).reduce((total, value) => total + value, 0),
  };
}

function numericAmount(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : 0;
}

export function validateSalesContractBudget(row: Partial<SalesContractBudgetRow> & Partial<BudgetItem>): SalesContractValidationError[] {
  const errors: SalesContractValidationError[] = [];
  for (const field of REQUIRED_FIELDS) {
    if (String(row[field] ?? '').trim() === '') errors.push({ field, message: `${String(field)}不能为空`, level: 'error' });
  }
  if (!SALES_CONTRACT_NATURE_OPTIONS.includes((LEGACY_NATURE_MAP[row.contractNature ?? ''] ?? row.contractNature) as SalesContractNature)) {
    errors.push({ field: 'contractNature', message: '合同性质只能选择存量框架合同或新增商业机会', level: 'error' });
  }
  for (let month = 1; month <= 12; month += 1) {
    const field = `months.m${month}`;
    const value = row.months?.[`m${month}` as keyof MonthlyBudget];
    if (value === undefined || value === null || (value as unknown) === '') errors.push({ field, message: '金额不能为空，未发生请填0', level: 'error' });
    else if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) errors.push({ field, message: '金额不能为负数', level: 'error' });
  }
  for (const field of ['nextYearBudget', 'yearAfterNextBudget'] as const) {
    const value = row[field];
    if (value === undefined || value === null || (value as unknown) === '') errors.push({ field, message: '金额不能为空，未发生请填0', level: 'error' });
    else if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) errors.push({ field, message: '金额不能为负数', level: 'error' });
  }
  const normalized = normalizeSalesContractBudget(row);
  if (normalized.annualTotal === 0 && normalized.nextYearBudget === 0 && normalized.yearAfterNextBudget === 0) {
    errors.push({ field: 'annualTotal', message: '三年签约额均为0，请确认是否确无签约计划', level: 'warning' });
  }
  return errors;
}
