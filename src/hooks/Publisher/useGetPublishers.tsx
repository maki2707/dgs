import useAxios from "../useAxios";
import { useQuery } from "react-query";

export const useGetPublishers= () => {
    const axios = useAxios();
    const getPublishers = async () => {
        try {
            const { data } = await axios.get(`/proizvodac/get`);

            return data;
        } catch (error) {
            console.log("Publishers data:", error);
        }
        return;
    };

    return useQuery(["publishersData"], () => getPublishers(), {
        onError: (error) => console.log(error),
        staleTime: Infinity,
    });
};

  


