import axios from 'axios';

const useAxios = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8080/',
  });

  return instance;
};

export default useAxios;
