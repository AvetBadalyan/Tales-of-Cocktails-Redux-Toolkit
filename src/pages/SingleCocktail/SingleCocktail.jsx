import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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

  if (!modifiedCocktail) {
    return <h2>No Cocktail found</h2>;
  } else {
    const { name, image, info, category, glass, instructions, ingredients } =
      modifiedCocktail;
    return (
      <div className="single-cocktail-page">
        {loading && <div>Loading...</div>}
        {!loading && (
          <div className="single-cocktail-page-container">
            <Link to="/">
              <button className="btn">Go Back To Home Page</button>
            </Link>
            <h2 className="section-title">{name}</h2>
            <div className="drink">
              <div className="single-cocktail-page-image-container">
                <img src={image} alt={name} />
              </div>
              <div className="drink-info">
                <p>
                  Name: <span className="drink-data">{name}</span>
                </p>
                <p>
                  Category: <span className="drink-data">{category}</span>
                </p>
                <p>
                  Info: <span className="drink-data">{info}</span>
                </p>
                <p>
                  Glass: <span className="drink-data">{glass}</span>
                </p>
                <p>
                  Instructions: <span className="drink-data">{instructions}</span>
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
