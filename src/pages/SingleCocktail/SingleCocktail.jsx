import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleCocktail } from "../../redux/features/cocktailSlice";

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

  if (!modifiedCocktail) {
    return <h2>No Cocktail found</h2>;
  } else {
    const { name, image, info, category, glass, instructions, ingredients } =
      modifiedCocktail;
    return (
      <div>
        {loading && <div>Loading...</div>}
        {!loading && (
          <div className="section cocktail-section">
            <Link to="/">
              <button className="btn">Go Back To Home Page</button>
            </Link>
            <h2 className="section-title">{name}</h2>
            <div className="drink">
              <img src={image} alt={name} />
              <div className="drink-info">
                <p>
                  <span className="drink-data">Name: {name}</span>
                </p>
                <p>
                  <span className="drink-data">Category: {category}</span>
                </p>
                <p>
                  <span className="drink-data">Info: {info}</span>
                </p>
                <p>
                  <span className="drink-data">Glass: {glass}</span>
                </p>
                <p>
                  <span className="drink-data">
                    Instructions: {instructions}
                  </span>
                </p>

                <p>
                  <span>{`INGREDIENTS: `}</span>
                  {ingredients.filter((item) => item !== null).join(", ")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
