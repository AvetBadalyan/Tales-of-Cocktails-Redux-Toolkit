import React from "react";
import CocktailList from "../../components/CocktailList/CocktailList";
import SearchInput from "../../components/Search/SearchInput";
import "./Cocktails.css";

export default function Cocktails() {
    return (
      <div className="Cocktails-page">
        <SearchInput />
        <CocktailList />
      </div>
    );
}
