import React, { FC } from 'react';
import { TResultsProps } from './types';
import { Box, Grow, Stack, Typography } from '@mui/material';
import { theme } from '../../styles/theme';
import Row from '../row';
import { grey } from '@mui/material/colors';
import { RESULTS_ROWS_TITLE, RESULTS_TITLE } from './constants';

export const Results: FC<TResultsProps> = ({
    results
}) => {
    return (
        <Box sx={resultsContainerStyle}>
            <Grow
                in={!!results}
                mountOnEnter
                unmountOnExit
                timeout={700}
            >
                <Stack spacing={1.5}>
                    <Typography
                        noWrap
                        color={theme.palette.common.white}
                        sx={resultTextStyle}
                        textTransform={'uppercase'}
                        variant={'h4'}
                        fontWeight={100}
                    >
                        {RESULTS_TITLE}
                    </Typography>
                    <Stack sx={resultsStyle} spacing={1}>
                        {
                            results && RESULTS_ROWS_TITLE.map((title, idx) => (
                                <Row
                                    key={title}
                                    title={title}
                                    size={results.length}
                                    results={results.map(result => result[idx])}
                                />
                            ))
                        }
                    </Stack>
                </Stack>
            </Grow>
        </Box>
    );
}

const resultsContainerStyle = {
    height: theme.spacing(21),
    pt: 1,
};

const resultTextStyle = {
    justifySelf: 'flex-end',
    userSelect: 'none',
    [theme.breakpoints.down('sm')]: {
        pl: 2
    }
};

const resultsStyle = {
    bgcolor: grey[800],
    p: 2.5,
    borderRadius: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
        borderRadius: 0,
        px: 1,
        pt: 1.5
    }
};