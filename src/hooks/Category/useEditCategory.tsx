import { useMutation } from 'react-query';
import useAxios from '../useAxios';
import { Kategorija } from '../../types/Category';
import queryClient from '../../util/queryClients';

export const useEditCategory= (id: number) => {
  const axios = useAxios();

  const editCategory = async (kategorija: any) => {
    return await axios.put(`/kategorija/update/${id}`, kategorija);
  };

  return useMutation(editCategory, {
    onSuccess: () => queryClient.invalidateQueries('categoriesData'),
    onError: (error) => console.log(error),
  });
};