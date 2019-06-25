import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axios.delete.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
