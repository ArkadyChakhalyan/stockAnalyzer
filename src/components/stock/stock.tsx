import React, { FC, useEffect, useState } from 'react';
import { Alert, Fade, Slide, Snackbar, Stack, Typography } from '@mui/material';
import { TStockPickProps } from './types';
import Button from '../button';
import { Input } from '../input/input';
import { BUTTON_START, ERROR_TEXT, STOCK_TITLE } from './constants';
import { StockService } from '../../services/stockService';
import { IStockData } from '../../types/types';
import { theme } from '../../styles/theme';
import { FADE_ANIMATION_TIME } from '../app/constants';

const stockService = new StockService();

export const Stock: FC<TStockPickProps> = ({
    onSetStock
}) => {
    const [ticker, setTicker] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [fade, setFade] = useState(true);
    const [forceRerender, setForceRerender] = useState(false);

    const onChange = (
        e:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const value = e.target.value;
        if (
            value &&
            !value.match(/^[A-Za-z]+$/) ||
            loading
        ) {
            return;
        }
        setError(false);
        setTicker(value.toUpperCase());
    };

    const onSubmit = () => {
        if (loading) return;
        setLoading(true);
        stockService.getStock(ticker).then((data: IStockData) => {
            if (!data) setError(true);
            setForceRerender(true);
            setTimeout(() => {
                onSetStock(data)
            }, FADE_ANIMATION_TIME);
        }).catch((error) => {
            setError(true);
            console.log(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    const onEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    const onClose = (
        event?: React.SyntheticEvent | Event, reason?: string
    ) => {
        if (reason === 'clickaway') return;
        setShowSnackbar(false);
    };

    useEffect(() => {
        if (error) {
            setShowSnackbar(true);
        }
    }, [error]);


    useEffect(() => {
        setFade(prev => !prev);
    }, [forceRerender]);

    return (
        <Fade
            in={fade}
            appear
            timeout={FADE_ANIMATION_TIME}
        >
            <Stack spacing={1.5}>
                <Typography
                    color={theme.palette.common.white}
                    variant={'h4'}
                    fontWeight={100}
                    textTransform={'uppercase'}
                    sx={titleStyle}
                >
                    {STOCK_TITLE}
                </Typography>
                <Stack spacing={1.5}>
                    <Input
                        type={'text'}
                        value={ticker}
                        onChange={onChange}
                        onKeyDown={onEnter}
                        error={error}
                    />
                    <Button
                        disabled={!ticker}
                        loading={loading}
                        onClick={onSubmit}
                        onKeyDown={onEnter}
                    >
                        {BUTTON_START}
                    </Button>
                    <Snackbar
                        open={showSnackbar}
                        autoHideDuration={3000}
                        TransitionComponent={(props) => <Slide {...props} direction={'up'} />}
                        onClose={onClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert severity={'error'} sx={errorStyle}>
                            {ticker}{ERROR_TEXT}
                        </Alert>
                    </Snackbar>
                </Stack>
            </Stack>
        </Fade>
    );
}

const titleStyle = {
    width: theme.spacing(),
    userSelect: 'none',
};

const errorStyle = {
    bgcolor: theme.palette.error.dark,
    color: theme.palette.common.white,
    '.MuiAlert-icon': {
        color: theme.palette.common.white
    }
};