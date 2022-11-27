import React, { FC, useEffect, useState } from 'react';
import { TAnalyzeProps } from './types';
import { alpha, Fade, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Header from '../header';
import Button from '../button';
import Results from '../results';
import { IColumn, IResult } from '../../types/types';
import { theme } from '../../styles/theme';
import { grey } from '@mui/material/colors';
import Row from '../row';
import { getColumnsFilled } from './helpers/getColumnsFilled';
import { ANALYZE_TITLE, BUTTON_ANALYZE, COLUMNS_TITLES, ROWS, YEARS_LONG, YEARS_SHORT, YEARS_TEXT } from './constants';
import { FADE_ANIMATION_TIME } from '../app/constants';
import { getColumnResult } from './helpers/getColumnResult';

export const Analyze: FC<TAnalyzeProps> = ({
    stockData,
    onReset
}) => {
    const [columns, setColumns] = useState<IColumn[]>([] as IColumn[]);
    const [results, setResults] = useState<IResult[][] | null>(null);
    const [disabled, setDisabled] = useState(true);
    const [fade, setFade] = useState(true);
    const [forceRerender, setForceRerender] = useState(false);
    const [years, setYears] = useState(YEARS_LONG);

    const onSetColumnData = (
        key: keyof IColumn,
        idx: number,
        value: string,
    ) => {
        setColumns(columns.map((column, index) => {
            if (index === idx) {
                if (!value.length) {
                    delete column[key];
                } else {
                    column[key] = Number(value);
                }
            }
            return column;
        }));
    };

    const onEnter = (e: React.KeyboardEvent) => {
        if (!disabled && e.key === 'Enter') {
            onSubmit();
        }
    };

    const onSubmit = () => {
        setResults(columns.map(column => getColumnResult(column, stockData, years)));
    };

    const onClickBack = () => {
        setForceRerender(true);
        setTimeout(onReset, FADE_ANIMATION_TIME);
    };

    const onYearsToggle = (
        e: React.MouseEvent<HTMLElement>,
        years: number
    ) => {
        if (!years) return;
        setYears(years);
    };

    useEffect(() => {
        if (!columns.length) return;
        if (getColumnsFilled(columns)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [columns]);

    useEffect(() => {
        if (columns.length) return;

        for (let i = 0; i < COLUMNS_TITLES.length - 1; i++) {
            columns.push({} as IColumn);
        }
    }, []);

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
                <Stack
                    justifyContent={'space-between'}
                    alignItems={'flex-end'}
                    direction={'row'}
                >
                    <Typography
                        color={theme.palette.common.white}
                        variant={'h4'}
                        fontWeight={100}
                        textTransform={'uppercase'}
                        sx={titleStyle}
                    >
                        {ANALYZE_TITLE}
                    </Typography>
                    <ToggleButtonGroup
                        value={years}
                        exclusive
                        onChange={onYearsToggle}
                    >
                        <ToggleButton sx={toggleStyle} value={YEARS_SHORT}>
                            {YEARS_SHORT} {YEARS_TEXT}
                        </ToggleButton>
                        <ToggleButton sx={toggleStyle} value={YEARS_LONG}>
                            {YEARS_LONG} {YEARS_TEXT}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <Stack
                    spacing={1}
                    sx={containerStyle}
                    onKeyDown={onEnter}
                >
                    <Header
                        columns={COLUMNS_TITLES}
                        ticker={stockData.ticker}
                        onClickBack={onClickBack}
                        price={stockData.price}
                    />
                    <Stack spacing={1} sx={rowsStyle}>
                        {
                            ROWS.map(row => (
                                <Row
                                    key={row.key}
                                    title={row.title}
                                    size={COLUMNS_TITLES.length - 1}
                                    adornment={row.adornment}
                                    onSetData={(idx, value) => onSetColumnData(row.key, idx, value)}
                                    //@ts-ignore
                                    currentData={stockData[row.key]}
                                />
                            ))
                        }
                    </Stack>
                    <Button disabled={disabled} onClick={onSubmit}>
                        {BUTTON_ANALYZE}
                    </Button>
                </Stack>
                <Results results={results} />
            </Stack>
        </Fade>
    );
}

const titleStyle = {
    width: theme.spacing(),
    userSelect: 'none',
    [theme.breakpoints.down('sm')]: {
        pl: 2
    }
};


const containerStyle = {
    position: 'relative',
    p: 2.5,
    pt: theme.spacing(7), //header height
    bgcolor: grey[800],
    borderRadius: theme.spacing(1.5),
    overflow: 'hidden',
    zIndex: theme.zIndex.appBar,
    [theme.breakpoints.down('sm')]: {
        width: `calc(100vw - ${theme.spacing(5)})`, // - paddings
        borderRadius: 0
    },
    [theme.breakpoints.down(500)]: {
        px: 1.5,
        width: `calc(100vw - ${theme.spacing(3)})`, // - paddings
    }
};

const rowsStyle = {
    py: 1.5
};

const toggleStyle = {
    width: theme.spacing(10.5),
    height: theme.spacing(5),
    color: alpha(theme.palette.common.white, 0.75),
    bgcolor: alpha(theme.palette.primary.main, 0.3),
    '&.Mui-selected': {
        color: theme.palette.common.white,
        bgcolor: theme.palette.primary.main,
    },
    '&.Mui-selected:focus, &.Mui-selected:hover, &:hover, &:focus': {
        color: theme.palette.common.white,
        bgcolor: theme.palette.primary.dark,
    }
};
