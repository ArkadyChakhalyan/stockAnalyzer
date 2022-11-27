import { IResult } from '../../types/types';

type TResultsFields = {
    results: IResult[][] | null;
}

type TResultsEvents = {}

export type TResultsProps = TResultsFields & TResultsEvents;