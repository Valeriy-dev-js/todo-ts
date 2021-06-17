import { IconButton } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import React from 'react';

interface Props {
    handleSorter: (type: boolean) => void;
    sorterType: boolean;
}
export const SortButtons: React.FC<Props> = ({ handleSorter , sorterType}) => {
    const handleButton = (type: boolean) => {
        if(type !== sorterType){
            handleSorter(type);
        };
    };

    return (
        <>
            <IconButton color={sorterType ? 'primary' : 'default'}
                onClick={() => handleButton(true)}>
                <ArrowUpwardIcon />
            </IconButton>
            <IconButton color={!sorterType ? 'primary' : 'default'}
                onClick={() => handleButton(false)}>
                <ArrowDownwardIcon />
            </IconButton>
        </>
    );
};