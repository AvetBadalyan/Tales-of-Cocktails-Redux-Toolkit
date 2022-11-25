import React from "react";
import { Link } from "react-router-dom";
import CocktailList from "../../components/CocktailList/CocktailList";
import SearchInput from "../../components/Search/SearchInput";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
     
      <Link to="/cocktails">
        <button>Explore All Cocktails 🍸 </button>
      </Link>
    </div>
  );
}
