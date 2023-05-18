import axios from 'axios';

const useAxios = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  return instance;
};

export default useAxios;