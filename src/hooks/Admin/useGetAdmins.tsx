import useAxios from "../useAxios";
import { useQuery } from "react-query";

export const useGetAdmins = () => {
    const axios = useAxios();
    const getAdmins = async () => {
        try {
            const { data } = await axios.get(`/korisnik/get`);

            return data;
        } catch (error) {
            console.log("Admin data:", error);
        }
        return;
    };

    return useQuery(["adminsData"], () => getAdmins(), {
        onError: (error) => console.log(error),
        staleTime: Infinity,
    });
};

export default useGetAdmins;
