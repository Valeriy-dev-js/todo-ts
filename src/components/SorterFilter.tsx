(import { Grid, Typography } from "@material-ui/core";
import { FilterButtons } from "./FilterButtons";
import { SortButtons } from "./SortButtons";

export const SorterFilter = ( { sorterFilter, setSorterFilter, setCurrentPage }) => {

    const handleSorter = (type: string) => void {
        setSorterFilter(prev => ({...prev, sorterType: type}));
        setCurrentPage(1);
    };

    const handleFilter = (type: string ) => void {
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