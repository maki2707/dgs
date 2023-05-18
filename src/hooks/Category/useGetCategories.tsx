import useAxios from "../useAxios";
import { useQuery } from "react-query";

export const useGetCategories = () => {
    const axios = useAxios();
    const getCategories = async () => {
        try {
            const { data } = await axios.get(`/kategorija/get`);

            return data;
        } catch (error) {
            console.log("Categories data:", error);
        }
        return;
    };

    return useQuery(["categoriesData"], () => getCategories(), {
        onError: (error) => console.log(error),
        staleTime: Infinity,
    });
};

export default useGetCategories;
