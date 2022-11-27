import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleCocktail } from "../../redux/features/cocktailSlice";
import "./SingleCocktail.css";

export default function SingleCocktail() {
  const { cocktail, loading } = useSelector((state) => ({ ...state.app }));
  const [modifiedCocktail, setModifiedCocktail] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleCocktail({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    console.log(cocktail, "cocktail");
    if (cocktail.length > 0) {
      const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strGlass: glass,
        strCategory: category,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = cocktail[0];

      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      ];

      const newCocktail = {
        name,
        image,
        info,
        category,
        glass,
        instructions,
        ingredients,
      };

      setModifiedCocktail(newCocktail);
    } else {
      setModifiedCocktail(null);
    }
  }, [id, cocktail]);

  return (
    <div className="single-cocktail-page">
      {loading && <div>Loading...</div>}

      {!modifiedCocktail && <h2>No Cocktail found</h2>}

      {!loading && modifiedCocktail && (
        <div className="name-container">
          <h2>
            Name: <span className="drink-data">{modifiedCocktail.name}</span>
          </h2>
        </div>
      )}

      {!loading && modifiedCocktail && (
        <div className="single-cocktail-page-container">
          <div className="drink">
            <div className="single-cocktail-page-image-container">
              <img src={modifiedCocktail.image} alt={modifiedCocktail.name} />
            </div>
            <div className="drink-info">
              <p>
                Category:{" "}
                <span className="drink-data">{modifiedCocktail.category}</span>
              </p>
              <p>
                Info:{" "}
                <span className="drink-data">{modifiedCocktail.info}</span>
              </p>
              <p>
                Glass:{" "}
                <span className="drink-data">{modifiedCocktail.glass}</span>
              </p>
              <p>
                Instructions:{" "}
                <span className="drink-data">
                  {modifiedCocktail.instructions}
                </span>
              </p>

              <p>
                INGREDIENTS:{" "}
                <span className="drink-data">
                  {" "}
                  {modifiedCocktail.ingredients
                    .filter((item) => item !== null)
                    .join(", ")}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
