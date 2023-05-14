import useAxios from "../useAxios";
import { useQuery } from "react-query";

export const useGetPublishers= () => {
    const axios = useAxios();
    const getPublishers = async () => {
        try {
            const { data } = await axios.get(`/publishers`);

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

export const proizvođačiList = {
    "proizvođači": [
      {
        "id":1,
        "nazivProizvođača": "Nintendo",
        "godOsnutka": "1889"
      },
      {"id":2,
        "nazivProizvođača": "Sony Interactive Entertainment",
        "godOsnutka": "1993"
      },
      {"id":3,
        "nazivProizvođača": "Microsoft Studios",
        "godOsnutka": "2002"
      },
      {"id":4,
        "nazivProizvođača": "Electronic Arts",
        "godOsnutka": "1982"
      },
      {"id":5,
        "nazivProizvođača": "Ubisoft",
        "godOsnutka": "1986"
      },
      {"id":6,
        "nazivProizvođača": "Activision",
        "godOsnutka": "1979"
      },
      {"id":7,
        "nazivProizvođača": "Bethesda Softworks",
        "godOsnutka": "1986"
      },
      {"id":8,
        "nazivProizvođača": "Rockstar Games",
        "godOsnutka": "1998"
      },
      {"id":9,
        "nazivProizvođača": "Square Enix",
        "godOsnutka": "2003"
      },
      {"id":10,
        "nazivProizvođača": "Blizzard Entertainment",
        "godOsnutka": "1991"
      }
    ]
  }
  


