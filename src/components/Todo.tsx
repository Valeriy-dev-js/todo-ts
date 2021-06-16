import { CircularProgress, Grid } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { Pagination } from './Pagination';
import { SorterFilter } from './SorterFilter';
import { ToDoInput } from './ToDoInput';
import { ToDoList } from './ToDoList';
import axios from '../axiosConfig';
import { useDispatch } from 'react-redux';
import { signout } from './auth/authSlice';

export const Todo = () => {
  //State
  const POSTurl = 'task';
  const dispatch = useDispatch();
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
    try {
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
    } catch (err: any) {
      const message = err.response.data.message;
      if (message === 'Incorrect token') {
        localStorage.clear();
        dispatch(signout());
      }
    }
  }, [sorterFilter, dispatch, currentPage, postsPerPage]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  //Action functions
  //Add Todo
  const handleTodoSubmit = async (todo: any) => {
    await axios.post(POSTurl, {
      name: todo,
      done: false,
    });
    await fetchTodos();
  };
  //Delete Todo
  const handleTodoDelete = async ({ uuid }: any) => {
    await axios.delete(`${POSTurl}/${uuid}`);
    await fetchTodos();
  };
  // //Change Todo
  const handleTodoChange = async ({ name, done, uuid }: any) => {
    await axios.patch(`${POSTurl}/${uuid}`, {
      name,
      done,
    });
    await fetchTodos();
  };

  return (
    <>
      <ToDoInput handleTodoSubmit={handleTodoSubmit} />
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