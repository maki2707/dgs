import axios from 'axios';

const useAxios = () => {
  const instance = axios.create({
    baseURL: 'https://dgs-be.onrender.com/',
  });

  return instance;
};

export default useAxios;
