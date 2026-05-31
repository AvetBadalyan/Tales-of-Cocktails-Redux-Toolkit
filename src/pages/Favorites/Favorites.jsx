import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavorite } from "../../redux/features/favoritesSlice";
import "./Favorites.css";

export default function Favorites() {
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Your Favorites</h1>

      {favorites.length === 0 && (
        <div className="favorites-empty">
          <p>No favorites yet.</p>
          <p>Hit ♥ on any cocktail to save it here.</p>
          <Link to="/cocktails">
            <button>Browse Cocktails</button>
          </Link>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div key={item.id} className="favorite-card">
              <Link to={`/cocktail/${item.id}`}>
                <img src={`${item.image}/small`} alt={item.name} className="favorite-card-img" />
              </Link>
              <div className="favorite-card-body">
                <p className="favorite-card-name">{item.name}</p>
                <div className="favorite-card-actions">
                  <Link to={`/cocktail/${item.id}`}>
                    <button className="fav-btn-details">Details</button>
                  </Link>
                  <button
                    className="fav-btn-remove"
                    onClick={() => dispatch(removeFavorite(item.id))}
                  >
                    Remove ♥
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
