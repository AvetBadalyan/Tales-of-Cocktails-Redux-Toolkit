import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCocktails, fetchSearchCocktail } from "../../redux/features/cocktailSlice";
import "./SearchInput.css";

export default function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.trim()) {
        dispatch(fetchSearchCocktail({ searchText: searchText.trim() }));
      } else {
        dispatch(fetchCocktails());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, dispatch]);

  return (
    <div className="search">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search your favorite cocktail..."
        />
      </form>
    </div>
  );
}
