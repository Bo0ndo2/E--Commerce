import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

export const useProductFilters = (products) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 400);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (debouncedSearchTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }, [debouncedSearchTerm, selectedCategory, sortBy, products]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filteredProducts,
  };
};
