import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  name: string;
  price: number;
  image: string;
  category: string;
  oldPrice?: number;
}

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productName: string) => void;
  isFavorite: (productName: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some(
        (item) => item.name === product.name
      );
      if (!exists) {
        return [...currentFavorites, product];
      }
      return currentFavorites;
    });
  };

  const removeFromFavorites = (productName: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((item) => item.name !== productName)
    );
  };

  const isFavorite = (productName: string) => {
    return favorites.some((item) => item.name === productName);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
