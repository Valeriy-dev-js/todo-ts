import { Button, Grid, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLogined,
  selectName,
  selectPassword,
  setUserName,
  setUserPassword,
  handleLogin
} from './authSlice';

export const Auth = () => {
  const dispatch = useDispatch();
  const isLogined = useSelector(selectIsLogined);
  const name = useSelector(selectName);
  const password = useSelector(selectPassword);
  console.log('LOGINED', isLogined);
  
  
  console.log('NAME',name,'Password', password);

  //   const handleUserChange = (e: any) => {
  //     const value = e.target.value;
  //   };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Grid container direction='column' alignItems='center'>
        <TextField
          name='name'
        //   error={helperText !== ''}
        //   helperText={helperText}
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

        {true ? (
          <Button
            onClick={() => handleLogin({name, password})}
            type='submit' 
            color='primary' 
            variant='contained'>
            Login
          </Button>
        ) : (
          <Button type='submit' color='secondary' variant='contained'>
            sign up
          </Button>
        )}
      </Grid>
    </form>
  );
};
