import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("toc_favorites") || "[]");
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { favorites: loadFavorites() },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.find((f) => f.id === action.payload.id)) {
        state.favorites.push(action.payload);
        localStorage.setItem("toc_favorites", JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((f) => f.id !== action.payload);
      localStorage.setItem("toc_favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
