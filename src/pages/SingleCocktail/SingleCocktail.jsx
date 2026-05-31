import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchSingleCocktail } from "../../redux/features/cocktailSlice";
import { addFavorite, removeFavorite } from "../../redux/features/favoritesSlice";
import "./SingleCocktail.css";

const addToRecentlyViewed = (id, name, image) => {
  try {
    const recent = JSON.parse(localStorage.getItem("toc_recently_viewed") || "[]");
    const filtered = recent.filter((r) => r.id !== id);
    const updated = [{ id, name, image }, ...filtered].slice(0, 5);
    localStorage.setItem("toc_recently_viewed", JSON.stringify(updated));
  } catch {}
};

export default function SingleCocktail() {
  const { cocktail, loading } = useSelector((state) => state.app);
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleCocktail({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const modifiedCocktail = useMemo(() => {
    if (!cocktail.length) return null;
    const {
      strDrink: name,
      strDrinkThumb: image,
      strAlcoholic: info,
      strGlass: glass,
      strCategory: category,
      strInstructions: instructions,
      strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5,
      strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10,
      strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15,
    } = cocktail[0];
    const ingredients = [
      strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5,
      strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10,
      strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15,
    ].filter(Boolean);
    return { name, image, info, category, glass, instructions, ingredients };
  }, [cocktail]);

  useEffect(() => {
    if (modifiedCocktail) {
      addToRecentlyViewed(id, modifiedCocktail.name, modifiedCocktail.image);
    }
  }, [id, modifiedCocktail]);

  const isFavorited = favorites.some((f) => f.id === id);

  const handleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFavorite(id));
    } else if (modifiedCocktail) {
      dispatch(addFavorite({ id, name: modifiedCocktail.name, image: modifiedCocktail.image }));
    }
  };

  return (
    <div className="single-cocktail-page">
      <button className="btn-back-page" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {loading && <div className="loading-text">Loading...</div>}

      {!loading && !modifiedCocktail && <h2>No cocktail found</h2>}

      {!loading && modifiedCocktail && (
        <div className="drink">
          <div className="single-cocktail-page-image-container">
            <img src={modifiedCocktail.image} alt={modifiedCocktail.name} />
          </div>
          <div className="drink-info">
            <h2 className="drink-name">
              {modifiedCocktail.name}
            </h2>
            <button
              className={`btn-favorite${isFavorited ? " favorited" : ""}`}
              onClick={handleFavorite}
            >
              {isFavorited ? "♥ Saved" : "♡ Save to Favorites"}
            </button>
            <p>Category: <span className="drink-data">{modifiedCocktail.category}</span></p>
            <p>Info: <span className="drink-data">{modifiedCocktail.info}</span></p>
            <p>Glass: <span className="drink-data">{modifiedCocktail.glass}</span></p>
            <p>Instructions: <span className="drink-data">{modifiedCocktail.instructions}</span></p>
            <p>
              Ingredients:{" "}
              {modifiedCocktail.ingredients.map((ing, i) => (
                <React.Fragment key={ing}>
                  <Link to={`/ingredient/${encodeURIComponent(ing)}`} className="ingredient-link">
                    {ing}
                  </Link>
                  {i < modifiedCocktail.ingredients.length - 1 && ", "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
