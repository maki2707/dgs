import React, { createContext, useState } from 'react';

type CategoryContextType = {
  categoryIndex: { category: string, index: number };
  setCategoryIndex: React.Dispatch<React.SetStateAction<{ category: string, index: number }>>;
};

export const CategoryContext = createContext<CategoryContextType>({
  categoryIndex: { category: '', index: -1 },
  setCategoryIndex: () => {},
});

type CategoryProviderProps = {
  children: React.ReactNode;
};

export const CategoryProvider = ({
  children,
}: CategoryProviderProps): JSX.Element => {
  const [categoryIndex, setCategoryIndex] = useState<{ category: string, index: number }>({ category: '', index: -1 });

  return (
    <CategoryContext.Provider value={{ categoryIndex, setCategoryIndex }}>
      {children}
    </CategoryContext.Provider>
  );
};
