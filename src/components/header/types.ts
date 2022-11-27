type THeaderFields = {
    columns: string[];
    price: number;
    ticker: string;
}

type THeaderEvents = {
    onClickBack: () => void;
}

export type THeaderProps = THeaderFields & THeaderEvents;