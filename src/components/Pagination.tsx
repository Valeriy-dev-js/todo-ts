import { Button, ButtonGroup, Grid } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React from 'react';

interface Props {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    pagesCount: number;
}
export const Pagination: React.FC<Props> = ({ currentPage, setCurrentPage, pagesCount }) => {

    const pageCount = new Array(pagesCount).fill(0).map((_, i) => i + 1)

    return (
        <Grid container>
            <Button
                color='primary'
                onClick={() => setCurrentPage(1)}>
                <ArrowBackIosIcon />
                <ArrowBackIosIcon />
            </Button>
            <Grid item xs={9}>
                <ButtonGroup fullWidth>
                    {pageCount.map(number => (
                        <Button
                            color='primary'
                            key={number}
                            variant={number === currentPage ? 'contained': 'outlined'}
                            onClick={() => setCurrentPage(number)}>
                            {number}
                        </Button>
                    ))}
                </ButtonGroup>
            </Grid>
            <Button
                color='primary'
                onClick={() => setCurrentPage(pageCount.length)}>
                <ArrowForwardIosIcon />
                <ArrowForwardIosIcon />
            </Button>
        </Grid>
    );
};