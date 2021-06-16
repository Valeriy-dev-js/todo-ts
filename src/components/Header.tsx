import { Button, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsSignup,
  selectIsLogined,
  toggleSignup,
  signout
} from './auth/authSlice';

export const Header = () => {
  const isLoggined = useSelector(selectIsLogined);
  const isSignup = useSelector(selectIsSignup);
  const dispatch = useDispatch();
  const name = localStorage.getItem('name');

  return (
    <Grid container alignItems='center' justify='space-between'>
      <Grid item xs={3}>
        <Typography variant='h3' align='center'>
          To Do
        </Typography>
      </Grid>
      {!isLoggined ? (
        <Grid item xs={3}>
          <Button
            color={isSignup ? 'secondary' : 'primary'}
            variant='contained'
            onClick={() => dispatch(toggleSignup())}
          >
            {isSignup ? 'sign up' : 'login'}
          </Button>
        </Grid>
      ) : (
        <Grid item xs={4}>
          <Grid container alignItems='center' justify='space-between'>
            <Typography>{name}</Typography>
            <Button
              onClick={() => dispatch(signout())}
              color='primary'
              variant='contained'
            >
              Signout
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
