import { IRow } from '../../types/types';

export const COLUMNS_TITLES = ['Now', 'Low', 'Mid', 'High'];

export const ROWS: IRow[] = [
    { title: 'Revenue Growth', key: 'revenueGrowth', adornment: '%' },
    { title: 'Profit Margin', key: 'profitMargin', adornment: '%' },
    { title: 'Operating Margin', key: 'operatingMargin', adornment: '%' },
    { title: 'P/E', key: 'priceToEarnings' },
    { title: 'P/CFC', key: 'priceToFreeCashFlow' },
    { title: 'Annual Return', key: 'annualReturn', adornment: '%' }
];

export const ANALYZE_TITLE = 'stock analyzer';
export const BUTTON_ANALYZE = 'analyze';

export const YEARS_SHORT = 5;
export const YEARS_LONG = 10;
export const YEARS_TEXT = 'years';