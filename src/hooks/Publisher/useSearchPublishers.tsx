import useAxios from "../useAxios";
import { useQuery } from "react-query";


export const useSearchPublishers = (searchTerm: string) => {
    const axios = useAxios();

    const searchPublishers = async (term: string) => {
        try {
            const response = await axios.get(`/proizvodac/search/${term}`);
            const { data } = response;

            return data;
        } catch (error) {
            console.log("Publishers data:", error);
        }
        return;
    };

    return useQuery(["publishersDataSearch", searchTerm], () => searchPublishers(searchTerm), {
        onError: (error) => console.log(error),
        staleTime: Infinity,
    });
};

export default useSearchPublishers;

