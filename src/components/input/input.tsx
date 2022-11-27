import React, { FC } from 'react';
import { alpha, OutlinedInput } from '@mui/material';
import { TInputProps } from './types';
import { theme } from '../../styles/theme';

export const Input: FC<TInputProps> = (props) => (
    <OutlinedInput
        {...props}
        sx={{ ...inputStyle, ...props.sx }}
    />
)

const inputStyle = {
    '.MuiOutlinedInput-notchedOutline': {
        border: `1px solid ${alpha(theme.palette.common.white, 0.6)}`
    },
    '&:hover': {
        '.MuiInputAdornment-root': {
            '.MuiTypography-root': {
                color: theme.palette.common.white
            }
        },
        ':not(.Mui-focused):not(.Mui-error)': {
            '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.common.white
            }
        }
    },
    '.MuiInputBase-input': {
        color: theme.palette.common.white,
        textAlign: 'center'
    },
    'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
        display: "none",
    },
    '.MuiInputAdornment-root': {
        marginLeft: theme.spacing(0.25),
        width: theme.spacing(),
        userSelect: 'none',
        pointerEvents: 'none',
        [theme.breakpoints.down(500)]: {
            width: theme.spacing(0.5),
        },
        '.MuiTypography-root': {
            color: alpha(theme.palette.common.white, 0.6),
            [theme.breakpoints.down(500)]: {
                fontSize: '0.85rem'
            }
        }
    },
    '&.Mui-focused': {
        '.MuiInputAdornment-root': {
            '.MuiTypography-root': {
                color: theme.palette.common.white
            }
        }
    }
};