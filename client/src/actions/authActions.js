import axios from 'axios';
import { REGISTER_USER, GET_ERRORS } from './types';


// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
    );
};