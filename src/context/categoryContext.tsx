import React, { createContext, useState } from 'react';

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
  const [category, setCategory] = useState<Kategorija>({
    nazivKategorije: '',
    opisKategorije: '',
    nazivAdmin: '',
    idAdmin: 0,
    idKategorija: 0,
  });

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
