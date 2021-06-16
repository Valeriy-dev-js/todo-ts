import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import axios from './axiosConfig'
import { setAlert } from './app/alertSlice';

axios.interceptors.response.use(req => req, error => {
  const alert = {
    isAlert: true,
    message: error.response.data.message,
    status: error.response.status
  }
  store.dispatch(setAlert(alert))
  return Promise.reject(error)
});

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
