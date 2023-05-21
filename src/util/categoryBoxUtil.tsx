import {
  Kategorija
} from "../types/Category";
import queryClient from "./queryClients";
export const handlePrevClick = (
  data: Kategorija[],
  currentIndex: number,
  setCurrentIndex: React.Dispatch < React.SetStateAction < number >> ,
  setCategory: React.Dispatch < React.SetStateAction < Kategorija >> ,
) => {
  const prevIndex = currentIndex === 0 ? data.length - 1 : currentIndex - 1;
  setCurrentIndex(prevIndex);
  setCategory(data[prevIndex]);
  queryClient.invalidateQueries('videogamesData');
};

export const handleNextClick = (
  data: Kategorija[],
  currentIndex: number,
  setCurrentIndex: React.Dispatch < React.SetStateAction < number >> ,
  setCategory: React.Dispatch < React.SetStateAction < Kategorija >> ,

) => {
  const nextIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1;
  setCurrentIndex(nextIndex);
  setCategory(data[nextIndex]);
  queryClient.invalidateQueries('videogamesData');
};

export const handleCategoryClick = (
  data: Kategorija[],
  category: Kategorija,
  setCurrentIndex: React.Dispatch < React.SetStateAction < number >> ,
  setCategory: React.Dispatch < React.SetStateAction < {
    category: Kategorija
  } >> ,
  setSearchText: React.Dispatch < React.SetStateAction < string >> ,
  setSearchResults: React.Dispatch < React.SetStateAction < Kategorija[] >>
) => {
  setCategory({
    category
  });
  setCurrentIndex(data.indexOf(category));
  setSearchText("");
  setSearchResults([]);
  queryClient.invalidateQueries('videogamesData');
};

export const handleSearch = (
  searchText: string,
  data: Kategorija[],
  setSearchResults: React.Dispatch < React.SetStateAction < Kategorija[] >> ,
  setSearchText: React.Dispatch < React.SetStateAction < string >>
) => {
  const filteredCategories = data.filter((category) =>
    category.nazivKategorije.toLowerCase().includes(searchText.toLowerCase())
  );
  setSearchResults(filteredCategories);
  setSearchText(searchText);
};