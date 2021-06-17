import { CircularProgress, Grid } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { Pagination } from './Pagination';
import { SorterFilter } from './SorterFilter';
import { ToDoInput } from './ToDoInput';
import { ToDoList } from './ToDoList';
import axios from '../axiosConfig';
import { Task } from '../app/interfaces';

export interface SorterFilterInt {
  sorterType: boolean;
  filterType: string; 
}
export const Todo = () => {
  //State
  const POSTurl = 'task';
  const [todos, setTodos] = useState([]);
  const [sorterFilter, setSorterFilter] = useState({
    sorterType: true,
    filterType: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [pagesCount, setPagesCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  //Fetch todos from API

  const fetchTodos = useCallback(async () => {
    //creating GETurl
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { sorterType, filterType } = sorterFilter;
    const res = await axios.get('/tasks', {
      //SorterParams
      params: {
        filterBy: filterType,
        order: sorterType ? 'desc' : 'asc',
        curentPage: currentPage,
        limit: postsPerPage,
      },
    });
    setTodos(res.data.tasks);
    setPagesCount(res.data.pagesCount);
    setIsLoading(false);
  }, [sorterFilter, currentPage, postsPerPage]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  //Action functions
  //Add Todo
  const handleTodoPost = async (name: string) => {
    await axios.post(POSTurl, {
      name,
      done: false,
    });
    await fetchTodos();
  };
  //Delete Todo
  const handleTodoDelete = async ({ uuid }: Task) => {
    await axios.delete(`${POSTurl}/${uuid}`);
    await fetchTodos();
  };
  // //Change Todo
  const handleTodoChange = async ({ name, done, uuid }: Task) => {
    await axios.patch(`${POSTurl}/${uuid}`, {
      name,
      done,
    });
    await fetchTodos();
  };

  return (
    <>
      <ToDoInput handleTodoPost={handleTodoPost} />
      <SorterFilter
        sorterFilter={sorterFilter}
        setSorterFilter={setSorterFilter}
        setCurrentPage={setCurrentPage}
      />
      {!isLoading && (
        <ToDoList
          todos={todos}
          handleTodoDelete={handleTodoDelete}
          handleTodoChange={handleTodoChange}
        />
      )}
      {pagesCount > 1 && !isLoading && (
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {isLoading && (
        <Grid container alignItems='center' direction='column'>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
    </>
  );
};
