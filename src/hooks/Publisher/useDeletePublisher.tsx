import { useMutation } from 'react-query';
import useAxios from '../useAxios';


export const useDeletePublisher = () => {
  const axios = useAxios();

  const deletePublisher = async (id: number) => {
    return await axios.delete(`/proizvodac/delete/${id}`);
  };

  return useMutation(deletePublisher, {
    onError: (error) => console.log(error),
  });
};