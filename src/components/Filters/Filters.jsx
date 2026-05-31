import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchCocktails,
  fetchCocktailsByCategory,
  fetchCocktailsByDigits,
  fetchCocktailsByLetter,
  setActiveFilter,
} from "../../redux/features/cocktailSlice";
import "./Filters.css";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Filters() {
  const dispatch = useDispatch();
  const { categories, activeFilter } = useSelector((state) => state.app);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAll = () => {
    dispatch(setActiveFilter(null));
    dispatch(fetchCocktails());
  };

  const handleCategory = (cat) => {
    dispatch(setActiveFilter({ type: "category", value: cat }));
    dispatch(fetchCocktailsByCategory({ category: cat }));
  };

  const handleLetter = (letter) => {
    dispatch(setActiveFilter({ type: "letter", value: letter }));
    dispatch(fetchCocktailsByLetter({ letter: letter.toLowerCase() }));
  };

  const handleDigits = () => {
    dispatch(setActiveFilter({ type: "digits", value: "0–9" }));
    dispatch(fetchCocktailsByDigits());
  };

  return (
    <div className="filters-container">
      <div className="filters-row">
        <span className="filters-label">Category</span>
        <button
          className={`filter-pill${!activeFilter ? " active" : ""}`}
          onClick={handleAll}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-pill${
              activeFilter?.type === "category" && activeFilter?.value === cat ? " active" : ""
            }`}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="filters-row">
        <span className="filters-label">A–Z</span>
        <button
          className={`filter-pill${!activeFilter ? " active" : ""}`}
          onClick={handleAll}
        >
          All
        </button>
        <button
          className={`filter-pill letter-pill${
            activeFilter?.type === "digits" ? " active" : ""
          }`}
          onClick={handleDigits}
        >
          0–9
        </button>
        {LETTERS.map((letter) => (
          <button
            key={letter}
            className={`filter-pill letter-pill${
              activeFilter?.type === "letter" && activeFilter?.value === letter ? " active" : ""
            }`}
            onClick={() => handleLetter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
