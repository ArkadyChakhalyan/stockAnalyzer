import React, { FC, useState } from 'react';
import { Stack } from '@mui/material';
import { theme } from '../../styles/theme';
import { Stock } from '../stock/stock';
import { TAppProps } from './types';
import { IStockData } from '../../types/types';
import Analyze from '../analyze';

export const App: FC<TAppProps> = () => {
    const [stockData, setStockData] = useState<IStockData | null>(null);

    const onReset = () => {
        setStockData(null);
    };

    return (
        <Stack
            sx={appStyle}
            justifyContent={!stockData ? 'center' : ''}
        >
            {
                stockData ?
                    <Analyze stockData={stockData} onReset={onReset} />
                    : <Stock onSetStock={setStockData} />
            }
        </Stack>
    );
}

const appStyle = {
    minWidth: theme.spacing(32),
    [theme.breakpoints.down('sm')]: {
        height: `calc(100vh - ${theme.spacing(4)})`
    },
};
