import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filters from "../../components/Filters/Filters";
import CocktailList from "../../components/CocktailList/CocktailList";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";
import SearchInput from "../../components/Search/SearchInput";
import { BASE, fetchCocktails } from "../../redux/features/cocktailSlice";
import "./Cocktails.css";

export default function Cocktails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasData = useSelector((state) => state.app.cocktails.length > 0);

  useEffect(() => {
    if (!hasData) {
      dispatch(fetchCocktails());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSurprise = () => {
    fetch(`${BASE}/random.php`)
      .then((r) => r.json())
      .then((data) => navigate(`/cocktail/${data.drinks[0].idDrink}`));
  };

  return (
    <div className="Cocktails-page">
      <div className="cocktails-top-bar">
        <SearchInput />
        <button className="btn-surprise" onClick={handleSurprise}>
          🊲 Surprise Me
        </button>
      </div>
      <Filters />
      <RecentlyViewed />
      <CocktailList />
    </div>
  );
}
