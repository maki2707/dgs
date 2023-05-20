import { useState, useEffect } from 'react';
import useAxios from "../useAxios";
import { useQuery } from "react-query";

interface Videogame {
    nazivVideoigre: string;
    cijenaVideoigre: number;
    proizvođač: {
        nazivProizvođača: string;
        godOsnutka: string;
    };
    minHardware: string;
}

export const useGetVideogames = (id: number) => {
    const axios = useAxios();

    const getVideogames = async (categoryId: number) => {
        try {
            const { data } = await axios.get(`/videoigra/get/categoryid/${categoryId}`);

            return data;
        } catch (error) {
            console.log("Videogames data:", error);
        }
        return;
    };

    return useQuery(["videogamesData", id], () => getVideogames(id), {
        onError: (error) => console.log(error),
        staleTime: Infinity,
    });
};

export default useGetVideogames;
