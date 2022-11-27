import { ButtonProps } from '@mui/material';

export type TButtonFields = {
    loading?: boolean;
}

export type TButtonEvents = {}

export type TButtonProps = TButtonFields & TButtonEvents & ButtonProps;