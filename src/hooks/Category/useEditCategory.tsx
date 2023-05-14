import { useMutation } from 'react-query';
import useAxios from '../useAxios';
import { Kategorija } from '../../types/Category';

export const useEditCategory= (id: number) => {
  const axios = useAxios();

  const editCategory = async (kategorija: any) => {
    return await axios.put(`/editpublisher/${id}`, kategorija);
  };

  return useMutation(editCategory, {
    onError: (error) => console.log(error),
  });
};