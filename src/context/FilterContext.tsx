import React, { createContext, useContext, useState } from "react";

interface FilterState {
  category: string[];
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: "price_asc" | "price_desc" | "name_asc" | "name_desc" | "newest";
  searchQuery: string;
}

interface FilterContextType {
  filters: FilterState;
  setCategory: (categories: string[]) => void;
  setPriceRange: (min: number, max: number) => void;
  setSortBy: (sort: FilterState["sortBy"]) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  category: [],
  priceRange: {
    min: 0,
    max: 100000,
  },
  sortBy: "newest",
  searchQuery: "",
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const setCategory = (categories: string[]) => {
    setFilters((prev) => ({
      ...prev,
      category: categories,
    }));
  };

  const setPriceRange = (min: number, max: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { min, max },
    }));
  };

  const setSortBy = (sort: FilterState["sortBy"]) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: sort,
    }));
  };

  const setSearchQuery = (query: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setCategory,
        setPriceRange,
        setSortBy,
        setSearchQuery,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
