import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { FilterButtons } from "./FilterButtons";
import { SortButtons } from "./SortButtons";
import { SorterFilterInt } from "./Todo";
interface Props {
    sorterFilter: SorterFilterInt;
    setSorterFilter: React.Dispatch<React.SetStateAction<SorterFilterInt>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}


export const SorterFilter: React.FC<Props> = ( { sorterFilter, setSorterFilter, setCurrentPage }) => {

    const handleSorter = (type: boolean) => {
        setSorterFilter(prev => ({...prev, sorterType: type}));
        setCurrentPage(1);
    };

    const handleFilter = (type: string) => {
        setSorterFilter({sorterType: true, filterType: type});
        setCurrentPage(1);
    };


    return (
        <Grid container
            direction='row'
            alignItems='center'
            justify='space-between'>
            <Grid >
                <FilterButtons handleFilter={handleFilter}
                               filterType={sorterFilter.filterType} />
            </Grid>
            <Grid >
                <Grid container
                    direction='row'
                    alignItems='center'
                >
                    <Typography>Sort by Date</Typography>
                    <SortButtons handleSorter={handleSorter}
                                 sorterType={sorterFilter.sorterType} />
                </Grid>
            </Grid>
        </Grid>
    );
};