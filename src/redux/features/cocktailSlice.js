import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

export const BASE = "https://www.thecocktaildb.com/api/json/v1/1";

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
        fetch(`${BASE}/filter.php?a=${filter}`).then((res) => res.json())
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
  async ({ id }) => fetch(`${BASE}/lookup.php?i=${id}`).then((res) => res.json())
);

export const fetchSearchCocktail = createAsyncThunk(
  "cocktails/fetchSearchCocktail",
  async ({ searchText }) =>
    fetch(`${BASE}/search.php?s=${encodeURIComponent(searchText)}`).then((res) => res.json())
);

export const fetchCategories = createAsyncThunk(
  "cocktails/fetchCategories",
  async () => fetch(`${BASE}/list.php?c=list`).then((res) => res.json())
);

export const fetchCocktailsByCategory = createAsyncThunk(
  "cocktails/fetchCocktailsByCategory",
  async ({ category }) =>
    fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`).then((res) => res.json())
);

export const fetchCocktailsByLetter = createAsyncThunk(
  "cocktails/fetchCocktailsByLetter",
  async ({ letter }) =>
    fetch(`${BASE}/search.php?f=${letter}`).then((res) => res.json())
);

export const fetchCocktailsByDigits = createAsyncThunk(
  "cocktails/fetchCocktailsByDigits",
  async () => {
    const responses = await Promise.all(
      "0123456789".split("").map((d) =>
        fetch(`${BASE}/search.php?f=${d}`).then((r) => r.json())
      )
    );
    const drinks = responses.flatMap((res) =>
      Array.isArray(res.drinks) ? res.drinks : []
    );
    return { drinks };
  }
);

export const fetchIngredient = createAsyncThunk(
  "cocktails/fetchIngredient",
  async ({ name }) => {
    const [infoRes, cocktailsRes] = await Promise.all([
      fetch(`${BASE}/search.php?i=${encodeURIComponent(name)}`).then((r) => r.json()),
      fetch(`${BASE}/filter.php?i=${encodeURIComponent(name)}`).then((r) => r.json()),
    ]);
    return { info: infoRes, cocktails: cocktailsRes };
  }
);

// Thunks that update the main cocktail list
const listThunks = [fetchCocktails, fetchSearchCocktail, fetchCocktailsByCategory, fetchCocktailsByLetter, fetchCocktailsByDigits];

// Helper: set cocktails from payload and reset pagination
const setListFulfilled = (state, action) => {
  state.loading = false;
  state.currentPage = 1;
  state.cocktails = Array.isArray(action.payload.drinks) ? action.payload.drinks : [];
};

const cocktailSlice = createSlice({
  name: "cocktails",
  initialState: {
    cocktails: [],
    cocktail: [],
    loading: false,
    error: null,
    currentPage: 1,
    categories: [],
    activeFilter: null,
    ingredient: null,
    ingredientCocktails: [],
    ingredientLoading: false,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // List thunks — fulfilled
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        setListFulfilled(state, action);
        state.activeFilter = null;
      })
      .addCase(fetchSearchCocktail.fulfilled, (state, action) => {
        setListFulfilled(state, action);
        state.activeFilter = null;
      })
      .addCase(fetchCocktailsByCategory.fulfilled, setListFulfilled)
      .addCase(fetchCocktailsByLetter.fulfilled, setListFulfilled)
      .addCase(fetchCocktailsByDigits.fulfilled, setListFulfilled)

      // Single cocktail
      .addCase(fetchSingleCocktail.fulfilled, (state, action) => {
        state.loading = false;
        state.cocktail = Array.isArray(action.payload.drinks) ? action.payload.drinks : [];
      })

      // Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = Array.isArray(action.payload.drinks)
          ? action.payload.drinks.map((d) => d.strCategory)
          : [];
      })

      // Ingredient
      .addCase(fetchIngredient.pending, (state) => {
        state.ingredientLoading = true;
        state.ingredient = null;
        state.ingredientCocktails = [];
      })
      .addCase(fetchIngredient.fulfilled, (state, action) => {
        state.ingredientLoading = false;
        const { ingredients } = action.payload.info;
        state.ingredient = Array.isArray(ingredients) && ingredients.length > 0 ? ingredients[0] : null;
        state.ingredientCocktails = Array.isArray(action.payload.cocktails.drinks)
          ? action.payload.cocktails.drinks
          : [];
      })
      .addCase(fetchIngredient.rejected, (state) => {
        state.ingredientLoading = false;
      })

      // Shared: all list + single thunks set loading on pending
      .addMatcher(
        isAnyOf(...listThunks.map((t) => t.pending), fetchSingleCocktail.pending),
        (state) => { state.loading = true; }
      )
      // Shared: all list + single thunks clear loading on rejected
      .addMatcher(
        isAnyOf(...listThunks.map((t) => t.rejected), fetchSingleCocktail.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? null;
        }
      );
  },
});

export const { setPage, setActiveFilter } = cocktailSlice.actions;
export default cocktailSlice.reducer;
