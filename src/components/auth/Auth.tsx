import { Button, Grid, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectName,
  selectPassword,
  selectIsSignup,
  setUserName,
  setUserPassword,
  login,
  signup
} from './authSlice';

export const Auth = () => {
  const dispatch = useDispatch();
  const isSignup = useSelector(selectIsSignup);
  const name = useSelector(selectName);
  const password = useSelector(selectPassword);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Grid container direction='column' alignItems='center'>
        <TextField
          name='name'
          onChange={(e) => dispatch(setUserName(e.target.value))}
          value={name}
          label='Username'
          required
          fullWidth
          variant='outlined'
          margin='normal'
        />
        <TextField
          name='password'
          required
          onChange={(e) => dispatch(setUserPassword(e.target.value))}
          value={password}
          label='Password'
          fullWidth
          variant='outlined'
          margin='normal'
          type='password'
        />
        {isSignup ? (
          <Button
            onClick={() => dispatch(login({ name, password }))}
            type='submit'
            color='primary'
            variant='contained'
          >
            Login
          </Button>
        ) : (
          <Button 
            onClick={() => dispatch(signup({name, password}))}
            type='submit' 
            color='secondary' 
            variant='contained' >
            sign up
          </Button>
        )}
      </Grid>
    </form>
  );
};
