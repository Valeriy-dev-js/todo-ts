import { TextField } from "@material-ui/core";
import React, { useState } from "react";

export const ToDoInput = ({ handleTodoPost }:any ) => {
    const [name, setName] = useState('');
    
    const pressEnter = async (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await handleTodoPost(name);
            setName('');
        };
    };

    return (
        <TextField
            multiline={true}
            label='ToDo'
            fullWidth
            variant='outlined'
            margin='normal'
            onChange={e => setName(e.target.value)}
            onKeyDown={(e) => pressEnter(e)}
            value={name}
        />
    );
};