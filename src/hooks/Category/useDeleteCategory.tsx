import { useMutation } from 'react-query';
import useAxios from '../useAxios';

export const useDeleteCategory = () => {
  const axios = useAxios();

  const deleteCategory = async (id: number) => {
    return await axios.delete(`/kategorija/delete/${id}`);
  };

  return useMutation(deleteCategory, {
    onError: (error) => console.log(error),
  });
};