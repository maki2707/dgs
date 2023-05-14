import { useMutation } from 'react-query';
import useAxios from '../useAxios';


export const useAddVideogame = () => {
  const axios = useAxios();

  const addVideogame = async (Videogame: any) => {
    return await axios.put(`/addVideogame`, Videogame);
  };

  return useMutation(addVideogame, {
    onError: (error) => console.log(error),
  });
};