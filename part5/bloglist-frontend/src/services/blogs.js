import axios from 'axios';

const url = '/api/blogs';

let token;
const setToken = (tokenNew) => {
  token = `bearer ${tokenNew}`;
};

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const create = async (objectNew) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(url, objectNew, config);
  return response.data;
};

export default { getAll, create, setToken };
