import { useMutation } from 'react-query';
import useAxios from '../useAxios';

export const useEditVideogame = (id: number | undefined) => {
  const axios = useAxios();

  const editVideogame = async (Videogame: any) => {
    return await axios.put(`/videoigra/update/${id}`, Videogame);
  };

  return useMutation(editVideogame, {
    onError: (error) => console.log(error),
  });
};