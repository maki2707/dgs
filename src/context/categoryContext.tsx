import React, { createContext, useEffect, useState } from 'react';

export interface Kategorija {
  nazivKategorije: string;
  opisKategorije: string;
  nazivAdmin: string;
  idAdmin: number;
  idKategorija: number;
}

type CategoryContextType = {
  category: Kategorija;
  setCategory: React.Dispatch<React.SetStateAction<Kategorija>>;
};

export const CategoryContext = createContext<CategoryContextType>({
  category: {
    nazivKategorije: '',
    opisKategorije: '',
    nazivAdmin: '',
    idAdmin: 0,
    idKategorija: 0,
  },
  setCategory: () => {},
});

type CategoryProviderProps = {
  children: React.ReactNode;
};

export const CategoryProvider = ({
  children,
}: CategoryProviderProps): JSX.Element => {
  const [category, setCategory] = useState<Kategorija>(() => {
    const storedCategory = localStorage.getItem('category');
    return storedCategory ? JSON.parse(storedCategory) : {
      nazivKategorije: '',
      opisKategorije: '',
      nazivAdmin: '',
      idAdmin: 0,
      idKategorija: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem('category', JSON.stringify(category));
  }, [category]);

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
