import { useCallback, useLayoutEffect } from 'react';
import { Todo } from './components/Todo';
import { Auth } from './components/auth/Auth';
import { Container, Snackbar } from '@material-ui/core';
import { Header } from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLogined,
  signout,
  toggleLogin,
} from './components/auth/authSlice';
import { decode } from 'jsonwebtoken';
// import axios from './axiosConfig';
import { selectAlert, setIsAlert } from './app/alertSlice';
import { Alert, AlertTitle } from '@material-ui/lab';

function App() {
  const isLoggined = useSelector(selectIsLogined)
  const alert = useSelector(selectAlert);
  const dispatch = useDispatch();

  const checkToken = useCallback(() => {
    if (!localStorage.token) return;
    const data: any = decode(localStorage.token);
    if (data === null) return dispatch(signout());
    if (data.exp < Date.now()) return dispatch(toggleLogin());
    dispatch(signout());
  }, [dispatch]);
  useLayoutEffect(() => {
    checkToken();
  }, [checkToken]);

  const handleClose = () => {
    dispatch(setIsAlert(false));
  };

  return (
    <Container maxWidth='sm'>
      <Header />
      {isLoggined
      ? <Todo />}
      <Auth />
      <Snackbar
        onClose={handleClose}
        open={alert.isAlert}
        autoHideDuration={3000}
      >
        <Alert severity='error'>
          <AlertTitle>{`Status code ${alert.status}`}</AlertTitle>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
