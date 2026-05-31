import { configureStore } from "@reduxjs/toolkit";
import CocktailReducer from "./features/cocktailSlice";
import FavoritesReducer from "./features/favoritesSlice";

export default configureStore({
  reducer: {
    app: CocktailReducer,
    favorites: FavoritesReducer,
  },
});
