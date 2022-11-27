import { IColumn } from '../../../types/types';


export const getColumnsFilled = (
    columns: IColumn[]
): boolean => {
    let isFilled = true;
    for (let i = 0; i < columns.length; i++) {
        const {
            priceToFreeCashFlow,
            priceToEarnings,
            profitMargin,
            operatingMargin,
            annualReturn,
            revenueGrowth
        } = columns[i];

        if (
            isNaN(profitMargin) ||
            isNaN(priceToEarnings) ||
            isNaN(priceToFreeCashFlow) ||
            isNaN(operatingMargin) ||
            isNaN(annualReturn) ||
            isNaN(revenueGrowth)
        ) {
            isFilled = false;
            break;
        }
    }
    return isFilled;
}