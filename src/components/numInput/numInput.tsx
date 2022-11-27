import React, { FC } from 'react';
import { InputAdornment } from '@mui/material';
import { TNumInputProps } from './types';
import { Input } from '../input/input';
import { theme } from '../../styles/theme';

export const NumInput: FC<TNumInputProps> = ({
    adornment,
    onSave
}) => {
    const onChange = (
        e:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const value = e.target.value;
        onSave(value);
    };

    return (
        <Input
            size={'small'}
            type={'number'}
            fullWidth
            endAdornment={adornment &&
                <InputAdornment position={'end'}>
                    {adornment}
                </InputAdornment>
        }
            onChange={onChange}
            sx={{
                ...inputStyle,
                ...(adornment && adornmentStyle)
            }}
        />
    );
}

const inputStyle = {
    width: theme.spacing(9),
    [theme.breakpoints.down(500)]: {
        width: theme.spacing(7),
        fontSize: '0.75rem'
    }
};

const adornmentStyle = {
    '.MuiInputBase-input': {
        paddingLeft: theme.spacing(1.25),
        color: theme.palette.common.white,
        textAlign: 'center'
    },
};