import { EValuation, IColumn, IResult, IStockData } from '../../../types/types';

export const getColumnResult = (
    column: IColumn,
    stockData: IStockData,
    years: number
): IResult[] => {
    const { revenue, price } = stockData;
    const {
        annualReturn,
        priceToFreeCashFlow,
        priceToEarnings,
        profitMargin,
        operatingMargin,
        revenueGrowth
    } = column;

    return [
        getResult(annualReturn, profitMargin, price, priceToEarnings, revenue, revenueGrowth, years),
        getResult(annualReturn, operatingMargin, price, priceToFreeCashFlow, revenue, revenueGrowth, years)
    ];
}

const getResult = (
    annualReturn: number,
    margin: number,
    price: number,
    ratio: number,
    revenue: number,
    growth: number,
    years: number
): IResult => {
    let totalFutureProfit = 0;
    let futureRevenue = revenue;
    for (let i = 0; i < years; i++) {
        futureRevenue = futureRevenue * (1 + growth / 100);
        const futureProfit = futureRevenue * (margin / 100);
        totalFutureProfit += futureProfit * (1 - (annualReturn / 100));
    }
    const value = Math.round(totalFutureProfit * ratio * 100) / 100;
    return {
        value,
        color: value > price ? EValuation.OVERVALUED : EValuation.UNDERVALUED
    };
}