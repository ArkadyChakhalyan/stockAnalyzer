import { IResult } from '../../types/types';


type TRowFields = {
    adornment?: string;
    currentData?: string;
    title: string;
    size: number;
    results?: IResult[];
}

type TColumnEvents = {
    onSetData?: (data: number, idx: string) => void;
}

export type TRowProps = TRowFields & TColumnEvents;