import { Button, ButtonGroup } from '@material-ui/core';
import React from 'react';
interface Props {
    handleFilter: (type: string) => void;
    filterType: string;
}
export const FilterButtons: React.FC<Props> = ({ handleFilter, filterType }) => {
    const buttons = [{title: 'All', type: ''},
                     {title: 'Done',type: 'done'},
                     {title: 'Undone', type: 'undone'}];

    return (
        <ButtonGroup >
            {buttons.map((button) => (
                <Button color='primary'
                    key={button.title}
                    variant={button.type === filterType ? 'contained': 'outlined'}
                    onClick={() => {
                        if (filterType !== button.type) {
                            return handleFilter(button.type)
                        }
                    }}>{button.title}</Button>
            ))}
        </ButtonGroup>
    );
};