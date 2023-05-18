import { useMutation } from 'react-query';
import useAxios from '../useAxios';

export const useAddPublisher = () => {
  const axios = useAxios();

  const addPublisher = async (publisher: any) => {
    return await axios.post(`/proizvodac/create`, publisher);
  };

  return useMutation(addPublisher, {
    onError: (error) => console.log(error),
  });
};