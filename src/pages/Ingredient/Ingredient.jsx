import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchIngredient } from "../../redux/features/cocktailSlice";
import "./Ingredient.css";

export default function Ingredient() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ingredient, ingredientCocktails, ingredientLoading } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchIngredient({ name }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(name)}-medium.png`;

  return (
    <div className="ingredient-page">
      <button className="btn-back-page" onClick={() => navigate(-1)}>← Back</button>

      {ingredientLoading && <div className="ingredient-loading">Loading...</div>}

      {!ingredientLoading && !ingredient && <h2>Ingredient not found</h2>}

      {!ingredientLoading && ingredient && (
        <>
          <div className="ingredient-hero">
            <div className="ingredient-image-container">
              <img src={imageUrl} alt={ingredient.strIngredient} />
            </div>
            <div className="ingredient-info">
              <h1 className="ingredient-name">{ingredient.strIngredient}</h1>
              {ingredient.strType && (
                <p>Type: <span className="ingredient-data">{ingredient.strType}</span></p>
              )}
              {ingredient.strAlcohol === "Yes" && ingredient.strABV && (
                <p>ABV: <span className="ingredient-data">{ingredient.strABV}%</span></p>
              )}
              {ingredient.strDescription && (
                <p className="ingredient-description">{ingredient.strDescription}</p>
              )}
            </div>
          </div>

          {ingredientCocktails.length > 0 && (
            <div className="ingredient-cocktails">
              <h2 className="ingredient-cocktails-title">
                {ingredientCocktails.length} cocktails with {ingredient.strIngredient}
              </h2>
              <div className="ingredient-cocktails-grid">
                {ingredientCocktails.map((c) => (
                  <Link key={c.idDrink} to={`/cocktail/${c.idDrink}`} className="ingredient-cocktail-card">
                    <img src={`${c.strDrinkThumb}/small`} alt={c.strDrink} />
                    <span>{c.strDrink}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
