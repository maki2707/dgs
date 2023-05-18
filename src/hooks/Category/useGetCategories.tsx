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

export const categoriesList = [
  {
    "nazivKategorije": "Akcija",
    "opisKategorije": "Igre koje se uglavnom fokusiraju na akciju, borbu i napucavanje.",
    "admin":"JohnB"
  },
  {
    "nazivKategorije": "RPG",
    "opisKategorije": "Igre uloge u kojima igrač preuzima ulogu lika i razvija ga kroz igru.",
    "admin":"LisaQ"
  },
  {
    "nazivKategorije": "Simulacija",
    "opisKategorije": "Igre koje simuliraju različite situacije, od letenja zrakoplovima do upravljanja gradovima.",
    "admin":"JohnB"
  },
  {
    "nazivKategorije": "Strategija",
    "opisKategorije": "Igre u kojima igrač mora planirati i izvršavati strategiju kako bi pobijedio protivnika.",
    "admin":"LisaQ"
  },
  {
    "nazivKategorije": "Puzzle",
    "opisKategorije": "Igre u kojima igrač mora riješiti različite probleme i zagonetke.",
    "admin":"LisaQ"
  },
  {
    "nazivKategorije": "Arkadne",
    "opisKategorije": "Igre koje su jednostavne za igranje i fokusiraju se na zabavu.",
    "admin":"JohnB"
  },
  {
    "nazivKategorije": "Sportske",
    "opisKategorije": "Igre koje simuliraju različite sportove, poput nogometa, košarke i tenisa.",
    "admin":"babyG"
  },
  {
    "nazivKategorije": "Trkaće",
    "opisKategorije": "Igre u kojima igrač vozi različite vrste vozila, poput automobila, motocikala i kamiona.",
    "admin":"LisaQ"
  },
  {
    "nazivKategorije": "Horor",
    "opisKategorije": "Igre koje se fokusiraju na strah i napetost, a često uključuju i elemente nadnaravnog.",
    "admin":"babyG"
  },
  {
    "nazivKategorije": "MMORPG",
    "opisKategorije": "Igre uloge u kojima igrači igraju zajedno u virtualnom svijetu.",
    "admin":"babyG"
  },
  
];

export default useGetCategories;
