import React from "react";
import CocktailList from "../../components/CocktailList/CocktailList";
import SearchInput from "../../components/Search/SearchInput";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <h2>Home</h2>
      <SearchInput />
      <CocktailList />
    </div>
  );
}
