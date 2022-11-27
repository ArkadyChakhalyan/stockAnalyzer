import { IStockData } from '../../types/types';


type TStockPickFields = {}

type TStockPickEvents = {
    onSetStock: (data: IStockData) => void;
}

export type TStockPickProps = TStockPickFields & TStockPickEvents;