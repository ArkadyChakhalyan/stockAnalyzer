import React, { FC } from 'react';
import { alpha, Stack, Typography } from '@mui/material';
import { TRowProps } from './types';
import { theme } from '../../styles/theme';
import Input from '../numInput';
import { EValuation } from '../../types/types';

export const Row: FC<TRowProps> = ({
    adornment,
    currentData,
    title,
    size,
    results,
    onSetData
}) => {
    const elements = [];

    for (let i = 0; i < size; i++) {
        if (onSetData) {
            elements.push(
                <Input
                    key={i}
                    adornment={adornment}
                    onSave={value => onSetData(i, value)}
                />
            );
        } else if (results) {
            elements.push(
                <Typography
                    key={i}
                    sx={{
                        ...resultStyle,
                        color: results[i].color === EValuation.OVERVALUED ?
                            theme.palette.error.light
                            : theme.palette.primary.light
                    }}
                    fontWeight={600}
                    textAlign={'center'}
                >
                    {results[i].value}$
                </Typography>
            );
        }
    }

    return (
        <Stack
            spacing={1}
            direction={'row'}
            alignItems={'center'}
        >
            <Typography
                noWrap
                color={alpha(theme.palette.common.white, 0.8)}
                sx={titleStyle}
            >
                {title}
            </Typography>
            <Typography
                noWrap
                color={theme.palette.common.white}
                sx={dataStyle}
            >
                {currentData ? currentData : (results ? null : '-')}
            </Typography>
            {elements.map(element => element)}
        </Stack>
    );
}

const titleStyle = {
    minWidth: theme.spacing(17.5),
    userSelect: 'none',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
    },
    [theme.breakpoints.down(500)]: {
        minWidth: theme.spacing(14),
        fontSize: '0.75rem',
    }
};

const dataStyle = {
    width: theme.spacing(8.75),
    userSelect: 'none',
    textAlign: 'center',
    [theme.breakpoints.down(500)]: {
        width: theme.spacing(7),
        fontSize: '0.85rem',
    }
};

const resultStyle = {
    height: theme.spacing(4),
    width: theme.spacing(9),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem'
    },
    [theme.breakpoints.down(500)]: {
        width: theme.spacing(7),
        fontSize: '0.85rem'
    }
};