import { Checkbox, Grid, IconButton, ListItem, ListItemText, TextField } from "@material-ui/core";
import { useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Task } from "../app/interfaces";

interface Props {
    todo: Task;
    handleTodoDelete: (task: Task) => Promise<void>;
    handleTodoChange: (task: Task) => Promise<void>;
}
const styles = {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '5px',
    marginBottom: '10px'
};

export const ToDoLIstItem: React.FC<Props> = ({ todo, handleTodoDelete, handleTodoChange }) => {
    const date = todo.createdAt.match(/\d+.\d+.\d+/s);
    const time: string = date !== null ? date[0] : "Date"
    const [toggleInput, setToggleInput] = useState(false);
    const [task, setTask] = useState(todo);
    const [disabled, setDisabled] = useState(false);

    const handleKeyDown = async (todo: Task, e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await handleTodoChange(task);
            setToggleInput(false);
        };
        if (e.key === 'Escape') {
            setToggleInput(false);
            setTask({ ...task, name: todo.name });
        };
    };
    const handleCheck = () => {
        const newTask = { ...task, done: !task.done };
        setTask(newTask);
        handleTodoChange(newTask);
    };
    const handleDelete = () => {
        setDisabled(true);
        handleTodoDelete(todo);
    };
    const handleBlur = () => {
        setToggleInput(false);
        setTask({ ...task, name: todo.name });
    };
    return (
        <ListItem style={styles}>
            <Grid container
                direction='row'
                alignItems='center'>
                <Grid item xs={1}>
                    <Checkbox
                        onChange={() => handleCheck()}
                        checked={task.done}
                        color='primary'
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                    />
                </Grid>
                <Grid item xs={8}>
                    {toggleInput
                        ? <TextField
                            onBlur={() => handleBlur()}
                            onChange={e => setTask({ ...task, name: e.target.value })}
                            onKeyDown={e => handleKeyDown(todo, e)} 
                            value={task.name}
                            multiline={true}
                            autoFocus={true}
                            variant='outlined'
                            fullWidth />
                        : <ListItemText primary={todo.name}
                            style={{ overflowWrap: 'break-word' }}
                            onClick={() => setToggleInput(true)} />}
                </Grid>
                <Grid item xs={2}>
                    <ListItemText primary={time} />
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        disabled={disabled}
                        onClick={() => handleDelete()}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </ListItem>
    );
};

