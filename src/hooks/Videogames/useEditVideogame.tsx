import { useMutation } from 'react-query';
import useAxios from '../useAxios';

export const useEditVideogame = (id: number) => {
  const axios = useAxios();

  const editVideogame = async (Videogame: any) => {
    return await axios.put(`/editVideogame/${id}`, Videogame);
  };

  return useMutation(editVideogame, {
    onError: (error) => console.log(error),
  });
};