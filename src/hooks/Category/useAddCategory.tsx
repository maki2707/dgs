import { useMutation } from 'react-query';
import useAxios from '../useAxios';


export const useAddCategory = () => {
  const axios = useAxios();

  const addCategory = async (kategorija: any) => {
    return await axios.post(`/kategorija/create`, kategorija);
  };

  return useMutation(addCategory, {
    onError: (error) => console.log(error),
  });
};