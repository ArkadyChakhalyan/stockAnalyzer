import { API_KEY } from './constants';
import { IStockData } from '../types/types';

export class StockService {
    getRes = async (stock: string) => {
        const res = await fetch(
            `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${stock}&region=US`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "yh-finance.p.rapidapi.com",
                "x-rapidapi-key": API_KEY
            }
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${stock}`) + `, recieved ${res.status}`
        }

        return await res.json();
    }

    getStock = async (
        ticker: string
    ): Promise<IStockData> => {
        const stock = await this.getRes(ticker);

        return new Promise((resolve) => {
            resolve(this._transformStock(ticker, stock))
        })
    }

    _transformStock = (
        ticker: string,
        stock: any
    ): IStockData => {
        const price = stock.financialData.currentPrice.raw;
        const freeCashFlow = stock.financialData.freeCashflow.raw;
        const shares = stock.defaultKeyStatistics.sharesOutstanding.raw
        return {
            ticker,
            price: stock.financialData.currentPrice.fmt,
            priceToFreeCashFlow: String(Math.round((price / (freeCashFlow / shares)) * 100) / 100),
            priceToEarnings: stock.summaryDetail.trailingPE.fmt,
            profitMargin: stock.financialData.profitMargins.fmt,
            operatingMargin: stock.financialData.operatingMargins.fmt,
            revenue: stock.financialData.totalRevenue.raw / shares
        }
    }
}