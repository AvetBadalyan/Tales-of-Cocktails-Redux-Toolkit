import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCocktails } from "../../redux/features/cocktailSlice";
import "./CocktailList.css";

export default function CocktailList() {
  const { cocktails, loading } = useSelector((state) => ({ ...state.app }));
  const [modifiedCocktails, setModifiedCocktails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCocktails());
  }, []);

  useEffect(() => {
    if (cocktails) {
      const newCocktails = cocktails.map((item) => {
        const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
          item;
        return {
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
        };
      });
      setModifiedCocktails(newCocktails);
    } else {
      setModifiedCocktails([]);
    }
  }, [cocktails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cocktails) {
    return <h2>No Cocktails matched your search </h2>;
  }

  return (
    <div className="home-container">
      <h1>SWEET, YUMMY & DELICIOUS</h1>
      <div className="cocktail-list-container">
        {modifiedCocktails.map((item, index) => {
          const { id, name, image, info, glass } = item;
          if (index % 2) {
            return (
              <div key={id} className="card">
                <div className="card-body">
                  <div className="card-title">Name: {name}</div>
                  <div className="card-title">Glass: {glass}</div>
                  <div className="card-text">info: {info}</div>
                 <div> <Link to={`/cocktail/${id}`}>
                    <button className="btn btn-info">Details</button>
                  </Link></div>
                </div>
                <div className="white-line"></div>
                <div className="card-image-container">
                  <img src={image} alt={name} />
                </div>
              </div>
            );
          } else {
            return (
              <div key={id} className="card">
                <div className="card-image-container">
                  <img src={image} alt={name} />
                </div>
                <div className="white-line"></div>
                <div className="card-body">
                  <h4 className="card-title">Name: {name}</h4>
                  <h4 className="card-title">Glass: {glass}</h4>
                  <div className="card-text">info: {info}</div>
                 <div> <Link to={`/cocktail/${id}`}>
                    <button className="btn btn-info">Details</button>
                  </Link></div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
