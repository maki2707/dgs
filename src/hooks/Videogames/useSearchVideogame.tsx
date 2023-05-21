import useAxios from "../useAxios";
import { useQuery } from "react-query";
export const useSearchVideogame = (searchTerm: string) => {
    const axios = useAxios();
    const searchVidegame = async (term: string) => {
        try {
            const response = await axios.get(`/videoigra/search/${term}`);
            const { data } = response;

            return data;
        } catch (error) {
            console.log("Videogame data:", error);
        }
        return;
    };
    return useQuery(["videogameDataSearch", searchTerm], () => searchVidegame(searchTerm), {
        onError: (error) => console.log(error),
        staleTime: Infinity,
    });
};
export default useSearchVideogame;

