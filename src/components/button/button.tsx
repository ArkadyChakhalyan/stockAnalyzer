import React, { FC } from 'react';
import { alpha, Button as MUIButton, CircularProgress } from '@mui/material';
import { TButtonProps } from './types';
import { theme } from '../../styles/theme';

export const Button: FC<TButtonProps> = ({
    loading,
    ...props
}) => (
    <MUIButton
        variant={'contained'}
        size={'large'}
        {...props}
        sx={{ ...buttonStyle, ...props.sx }}
        endIcon={loading && <CircularProgress color={'inherit'} size={16} sx={loadingStyle} />}
    />
)

const buttonStyle = {
    boxShadow: 'none',
    '&:hover, &:focus': {
        boxShadow: 'none'
    },
    '&:disabled': {
        bgcolor: alpha(theme.palette.primary.light, 0.38),
        color: alpha(theme.palette.common.black, 0.4),
    },
    '.MuiButton-endIcon': {
        m: 0
    }
};

const loadingStyle = {
    position: 'absolute',
    right: theme.spacing(2),
    translate: '0 -50%'
};