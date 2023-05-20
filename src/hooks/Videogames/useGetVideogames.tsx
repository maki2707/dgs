import { useState, useEffect, useContext } from 'react';
import useAxios from "../useAxios";
import { useQuery } from "react-query";
import { CategoryContext } from '../../context/categoryContext';

interface Videogame {
    nazivVideoigre: string;
    cijenaVideoigre: number;
    proizvođač: {
        nazivProizvođača: string;
        godOsnutka: string;
    };
    minHardware: string;
}

export const useGetVideogames = () => {
    const { category } = useContext(CategoryContext);
    const axios = useAxios();
  
    const getVideogames = async () => {
      try {
        const { data } = await axios.get(`/videoigra/get/categoryid/${category.idKategorija}`);
        return data;
      } catch (error) {
        console.log("Videogames data:", error);
        throw new Error("Error fetching videogames");
      }
    };
  
    return useQuery(["videogamesData", category.idKategorija], () => getVideogames(), {
      onError: (error) => console.log(error),
    });
  };
  

export default useGetVideogames;
