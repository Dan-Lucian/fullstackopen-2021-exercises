import axios from 'axios';

const url = 'api/login';
let token;

const setToken = (tokenNew) => {
  token = `bearer ${tokenNew}`;
};

const login = async (objectNew) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(url, objectNew, config);
  return response.data;
};

export default { setToken, login };
