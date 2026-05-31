import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const urlName = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const urlId = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export const fetchCocktails = createAsyncThunk(
  "cocktails/fetchCocktails",
  async () => {
    const categories = [
      { filter: "Alcoholic", label: "Alcoholic" },
      { filter: "Non_Alcoholic", label: "Non alcoholic" },
      { filter: "Optional_alcohol", label: "Optional alcohol" },
    ];
    const responses = await Promise.all(
      categories.map(({ filter }) =>
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${filter}`).then((res) => res.json())
      )
    );
    const drinks = responses.flatMap((res, i) =>
      Array.isArray(res.drinks)
        ? res.drinks.map((d) => ({ ...d, strAlcoholic: categories[i].label }))
        : []
    );
    return { drinks };
  }
);

export const fetchSingleCocktail = createAsyncThunk(
  "cocktails/fetchSingleCocktail",
  async ({ id }) => {
    return fetch(`${urlId}${id}`).then((res) => res.json());
  }
);

export const fetchSearchCocktail = createAsyncThunk(
  "cocktails/fetchSearchCocktail",
  async ({ searchText }) => {
    return fetch(`${urlName}${searchText}`).then((res) => res.json());
  }
);

const cocktailSlice = createSlice({
  name: "cocktails",
  initialState: {
    cocktails: [],
    cocktail: [],
    loading: false,
    error: null,
    currentPage: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [fetchCocktails.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCocktails.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentPage = 1;
      state.cocktails = Array.isArray(action.payload.drinks) ? action.payload.drinks : [];
    },
    [fetchCocktails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [fetchSingleCocktail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSingleCocktail.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktail = Array.isArray(action.payload.drinks) ? action.payload.drinks : [];
    },
    [fetchSingleCocktail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [fetchSearchCocktail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSearchCocktail.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentPage = 1;
      state.cocktails = Array.isArray(action.payload.drinks) ? action.payload.drinks : [];
    },
    [fetchSearchCocktail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setPage } = cocktailSlice.actions;
export default cocktailSlice.reducer;
