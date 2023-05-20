import useAxios from "../useAxios";
import { useQuery } from "react-query";


export const useSearchCategories = (searchTerm: string) => {
    const axios = useAxios();

    const searchCategories = async (term: string) => {
        try {
            const response = await axios.get(`/kategorija/search/${term}`);
            const { data } = response;

            return data;
        } catch (error) {
            console.log("Categories data:", error);
        }
        return;
    };

    return useQuery(["categoriesDataSearch", searchTerm], () => searchCategories(searchTerm), {
        onError: (error) => console.log(error),
        staleTime: Infinity,
    });
};

export default useSearchCategories;

