import React, { FC } from 'react';
import { THeaderProps } from './types';
import { IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { theme } from '../../styles/theme';

export const Header: FC<THeaderProps> = ({
    columns,
    price,
    ticker,
    onClickBack
}) => {
    return (
        <Stack
            direction={'row'}
            alignItems={'center'}
            sx={headerStyle}
            spacing={1}
        >
            <Stack
                sx={backStyle}
                direction={'row'}
                alignItems={'center'}
            >
                <IconButton
                    onClick={onClickBack}
                    sx={backButtonStyle}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Stack spacing={-0.25} alignItems={'center'}>
                    <Typography
                        color={theme.palette.common.white}
                        sx={backTitleStyle}
                        variant={'body2'}
                        textTransform={'uppercase'}
                    >
                        {ticker}
                    </Typography>
                    <Typography
                        color={theme.palette.common.white}
                        fontWeight={600}
                        variant={'subtitle2'}
                        sx={backTitleStyle}
                    >
                        ${price}
                    </Typography>
                </Stack>
            </Stack>
            {
                columns.map(column => (
                    <Typography
                        key={column}
                        color={theme.palette.common.white}
                        fontWeight={600}
                        sx={columnHeaderStyle}
                    >
                        {column}
                    </Typography>
                ))
            }
        </Stack>
    );
}

const headerPaddingLeft = theme.spacing(20.5);
const headerPaddingLeftMobile = theme.spacing(15.5)

const headerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `calc(100% - ${headerPaddingLeft})`,
    pl: headerPaddingLeft,
    height: theme.spacing(7),
    bgcolor: theme.palette.primary.main,
    [theme.breakpoints.down(500)]: {
        pl: headerPaddingLeftMobile,
        width: `calc(100% - ${headerPaddingLeftMobile})`,
    }
};

const columnHeaderStyle = {
    width: theme.spacing(8.75),
    textAlign: 'center',
    userSelect: 'none',
    [theme.breakpoints.down(500)]: {
        fontSize: '0.8rem',
        width: theme.spacing(7),
    }
};

const backStyle = {
    position: 'absolute',
    left: theme.spacing(0.75),
    [theme.breakpoints.down(500)]: {
        left: theme.spacing(0.25),
    }
};

const backButtonStyle = {
    color: theme.palette.common.white
};

const backTitleStyle = {
    userSelect: 'none',
    [theme.breakpoints.down(500)]: {
        fontSize: '0.85rem',
        ml: -0.5
    }
};

