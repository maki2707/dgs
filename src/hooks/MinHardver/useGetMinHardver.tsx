import useAxios from "../useAxios";
import { useQuery } from "react-query";

export const useGetMinHardver= () => {
    const axios = useAxios();
    const getMinHardver = async () => {
        try {
            const { data } = await axios.get(`/minhardver/get`);

            return data;
        } catch (error) {
            console.log("Min hardver data:", error);
        }
        return;
    };

    return useQuery(["minHardverData"], () => getMinHardver(), {
        onError: (error) => console.log(error),
        staleTime: Infinity,
    });
};

  

