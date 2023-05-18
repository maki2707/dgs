import { useMutation } from 'react-query';
import useAxios from '../useAxios';

export const useEditPublisher = (id: number) => {
  const axios = useAxios();

  const editPublisher = async (publisher: any) => {
    return await axios.put(`/proizvodac/update/${id}`, publisher);
  };

  return useMutation(editPublisher, {
    onError: (error) => console.log(error),
  });
};