import { List } from '@material-ui/core';
import { Task, Tasks } from '../app/interfaces';
import { ToDoLIstItem } from './ToDoListItem';
interface Props {
    todos: Tasks;
    handleTodoDelete:(task: Task) => Promise<void>;
    handleTodoChange:(task: Task) => Promise<void>;
}
export const ToDoList: React.FC<Props> = ({ todos, handleTodoDelete, handleTodoChange }) => {
    return (
        <List>
            {todos.map((todo: Task) => (
                <ToDoLIstItem
                    key={todo.uuid}
                    todo={todo}
                    handleTodoDelete={handleTodoDelete}
                    handleTodoChange={handleTodoChange}
                />
            ))}
        </List>
    );
};