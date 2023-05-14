// categoryBoxUtils.ts

import { categoriesList } from "../../hooks/Category/useGetCategories";

interface Category {
  nazivKategorije: string;
  opisKategorije: string;
  admin: string
}

export const handlePrevClick = (
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  setCategoryIndex: React.Dispatch<React.SetStateAction<{ category: string; index: number }>>
) => {
  const prevIndex = currentIndex === 0 ? categoriesList.length - 1 : currentIndex - 1;
  setCurrentIndex(prevIndex);
  setCategoryIndex({ category: categoriesList[prevIndex].nazivKategorije, index: prevIndex });
};


export const handleNextClick = (
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  setCategoryIndex: React.Dispatch<React.SetStateAction<{ category: string; index: number }>>
) => {
  const nextIndex = currentIndex === categoriesList.length - 1 ? 0 : currentIndex + 1;
  setCurrentIndex(nextIndex);
  setCategoryIndex({ category: categoriesList[nextIndex].nazivKategorije, index: nextIndex });
};



export const handleCategoryClick = (category: Category, setCurrentIndex: Function, setCategory: Function, setSearchText: Function, setSearchResults: Function) => {
    setCategory(category.nazivKategorije);
    setCurrentIndex(categoriesList.indexOf(category));
    setSearchText("");
    setSearchResults([]);
  };
  
  export const handleSearch = (searchText: string, categoriesList: Category[], setSearchResults: Function, setSearchText: Function) => {
    const filteredCategories = categoriesList.filter((category) =>
      category.nazivKategorije.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredCategories);
    setSearchText(searchText);
  };
  