export interface IColumn {
    annualReturn: number;
    operatingMargin: number;
    priceToEarnings: number;
    priceToFreeCashFlow: number;
    profitMargin: number;
    revenueGrowth: number;
}

export interface IStockData {
    ticker: string;
    price: number;
    operatingMargin: string;
    priceToEarnings: string;
    priceToFreeCashFlow: string;
    profitMargin: string;
    revenue: number;
}

export interface IColumnResults {
    earningsValue: number;
    freeCashFlowValue: number;
}

export interface IRow {
    adornment?: string;
    key: keyof IColumn;
    title: string;
}

export interface IResult {
    color: EValuation;
    value: number;
}

export enum EValuation {
    OVERVALUED,
    UNDERVALUED
}