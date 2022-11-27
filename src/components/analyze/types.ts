import { IStockData } from '../../types/types';

type TAnalyzeFields = {
    stockData: IStockData;
}

type TAnalyzeEvents = {
    onReset: () => void;
}

export type TAnalyzeProps = TAnalyzeFields & TAnalyzeEvents;