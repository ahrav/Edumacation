import axios from 'axios';

export default (setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axios.delete.defaults.headers.common['Authorization'];
  }
});
