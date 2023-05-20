import { useMutation } from 'react-query';
import useAxios from '../useAxios';


export const useDeleteVideogame = () => {
  const axios = useAxios();

  const deleteVideogame = async (id: number) => {
    return await axios.delete(`/videoigra/delete/${id}`);
  };

  return useMutation(deleteVideogame, {
    onError: (error) => console.log(error),
  });
};