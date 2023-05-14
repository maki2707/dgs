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

export const useGetVideogames = () => {
    const axios = useAxios();
    const getVideogames= async () => {
        try {
            const { data } = await axios.get(`/videogames`);

            return data;
        } catch (error) {
            console.log("Videogames data:", error);
        }
        return;
    };

    return useQuery(["videogamesData"], () => getVideogames(), {
        onError: (error) => console.log(error),
        staleTime: Infinity,
    });
};

const videogamesList: Record<string, Videogame[]> = {
"Akcija": [
{
"nazivVideoigre": "Doom Eternal",
"cijenaVideoigre": 59.99,
"proizvođač": {
"nazivProizvođača": "id Software",
"godOsnutka": "1991"
},
"minHardware": "NVIDIA GeForce GTX 1050Ti"
},
{
"nazivVideoigre": "Assassin's Creed Valhalla",
"cijenaVideoigre": 69.99,
"proizvođač": {
"nazivProizvođača": "Ubisoft",
"godOsnutka": "1986"
},
"minHardware": "NVIDIA GeForce GTX 960"
}
],
"Simulacija": [
{
"nazivVideoigre": "Farming Simulator 22",
"cijenaVideoigre": 39.99,
"proizvođač": {
"nazivProizvođača": "GIANTS Software",
"godOsnutka": "2008"
},
"minHardware": "Intel Core i3-2100T"
},
{
"nazivVideoigre": "Microsoft Flight Simulator",
"cijenaVideoigre": 59.99,
"proizvođač": {
"nazivProizvođača": "Asobo Studio",
"godOsnutka": "2002"
},
"minHardware": "NVIDIA GeForce GTX 770"
}
],
"Sportske": [
{
"nazivVideoigre": "FIFA 22",
"cijenaVideoigre": 59.99,
"proizvođač": {
"nazivProizvođača": "EA Sports",
"godOsnutka": "1991"
},
"minHardware": "AMD Radeon R7 260X"
},
{
"nazivVideoigre": "NBA 2K22",
"cijenaVideoigre": 69.99,
"proizvođač": {
"nazivProizvođača": "Visual Concepts",
"godOsnutka": "1988"
},
"minHardware": "NVIDIA GeForce GTX 750 Ti"
}
]
};

const useGetVideogame = (category: string): Videogame[] => {
const [videogames, setVideogames] = useState<Videogame[]>([]);

useEffect(() => {
if (videogamesList[category]) {
setVideogames(videogamesList[category]);
} else {
setVideogames([]);
}
}, [category]);

return videogames;
};

export default useGetVideogame;