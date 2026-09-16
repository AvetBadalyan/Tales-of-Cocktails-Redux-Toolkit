import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import * as api from '@services/cocktailApi'

// ===========================================
// ASYNC THUNKS
// ===========================================

export const fetchCocktails = createAsyncThunk(
	'cocktails/fetchCocktails',
	async () => api.fetchAllCocktails()
)

export const fetchSingleCocktail = createAsyncThunk(
	'cocktails/fetchSingleCocktail',
	async ({ id }) => api.fetchCocktailById(id)
)

export const fetchSearchCocktail = createAsyncThunk(
	'cocktails/fetchSearchCocktail',
	async ({ searchText }) => api.searchCocktails(searchText)
)

export const fetchCategories = createAsyncThunk(
	'cocktails/fetchCategories',
	async () => api.fetchCocktailCategories()
)

export const fetchCocktailsByCategory = createAsyncThunk(
	'cocktails/fetchCocktailsByCategory',
	async ({ category }) => api.fetchCocktailsByCategory(category)
)

export const fetchCocktailsByLetter = createAsyncThunk(
	'cocktails/fetchCocktailsByLetter',
	async ({ letter }) => api.fetchCocktailsByLetter(letter)
)

export const fetchCocktailsByDigits = createAsyncThunk(
	'cocktails/fetchCocktailsByDigits',
	async () => api.fetchCocktailsByDigits()
)

export const fetchIngredient = createAsyncThunk(
	'cocktails/fetchIngredient',
	async ({ name }) => api.fetchIngredientData(name)
)

// Thunks that update the main cocktail list
const listThunks = [
	fetchCocktails,
	fetchSearchCocktail,
	fetchCocktailsByCategory,
	fetchCocktailsByLetter,
	fetchCocktailsByDigits
]

// ===========================================
// INITIAL STATE
// ===========================================

const initialState = {
	cocktails: [],
	cocktail: null,
	loading: false,
	error: null,
	currentPage: 1,
	categories: [],
	activeFilter: null,
	ingredient: null,
	ingredientCocktails: [],
	ingredientLoading: false
}

// ===========================================
// HELPERS
// ===========================================

const setListFulfilled = (state, action) => {
	state.loading = false
	state.error = null
	state.currentPage = 1
	state.cocktails = Array.isArray(action.payload.drinks)
		? action.payload.drinks
		: []
}

// ===========================================
// SLICE
// ===========================================

const cocktailSlice = createSlice({
	name: 'cocktails',
	initialState,
	reducers: {
		setPage: (state, action) => {
			state.currentPage = action.payload
		},
		setActiveFilter: (state, action) => {
			state.activeFilter = action.payload
		},
		clearError: state => {
			state.error = null
		},
		resetCocktailState: () => initialState
	},
	extraReducers: builder => {
		builder
			// List thunks — fulfilled
			.addCase(fetchCocktails.fulfilled, (state, action) => {
				setListFulfilled(state, action)
				state.activeFilter = null
			})
			.addCase(fetchSearchCocktail.fulfilled, (state, action) => {
				setListFulfilled(state, action)
				state.activeFilter = null
			})
			.addCase(fetchCocktailsByCategory.fulfilled, setListFulfilled)
			.addCase(fetchCocktailsByLetter.fulfilled, setListFulfilled)
			.addCase(fetchCocktailsByDigits.fulfilled, setListFulfilled)

			// Single cocktail
			.addCase(fetchSingleCocktail.fulfilled, (state, action) => {
				state.loading = false
				state.error = null
				state.cocktail =
					Array.isArray(action.payload.drinks) &&
					action.payload.drinks.length > 0
						? action.payload.drinks[0]
						: null
			})

			// Categories
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.categories = Array.isArray(action.payload.drinks)
					? action.payload.drinks.map(d => d.strCategory)
					: []
			})

			// Ingredient
			.addCase(fetchIngredient.pending, state => {
				state.ingredientLoading = true
				state.ingredient = null
				state.ingredientCocktails = []
			})
			.addCase(fetchIngredient.fulfilled, (state, action) => {
				state.ingredientLoading = false
				const { ingredients } = action.payload.info
				state.ingredient =
					Array.isArray(ingredients) && ingredients.length > 0
						? ingredients[0]
						: null
				state.ingredientCocktails = Array.isArray(
					action.payload.cocktails.drinks
				)
					? action.payload.cocktails.drinks
					: []
			})
			.addCase(fetchIngredient.rejected, (state, action) => {
				state.ingredientLoading = false
				state.error = action.error.message ?? 'Failed to fetch ingredient'
			})

			// Shared: all list + single thunks set loading on pending
			.addMatcher(
				isAnyOf(...listThunks.map(t => t.pending), fetchSingleCocktail.pending),
				state => {
					state.loading = true
					state.error = null
				}
			)
			// Shared: all list + single thunks clear loading on rejected
			.addMatcher(
				isAnyOf(
					...listThunks.map(t => t.rejected),
					fetchSingleCocktail.rejected
				),
				(state, action) => {
					state.loading = false
					state.error = action.error.message ?? 'Something went wrong'
				}
			)
	}
})

export const { setPage, setActiveFilter, clearError, resetCocktailState } =
	cocktailSlice.actions

// Selectors
export const selectCocktails = state => state.cocktails.cocktails
export const selectCurrentCocktail = state => state.cocktails.cocktail
export const selectLoading = state => state.cocktails.loading
export const selectError = state => state.cocktails.error
export const selectCurrentPage = state => state.cocktails.currentPage
export const selectCategories = state => state.cocktails.categories
export const selectActiveFilter = state => state.cocktails.activeFilter
export const selectIngredient = state => state.cocktails.ingredient
export const selectIngredientCocktails = state =>
	state.cocktails.ingredientCocktails
export const selectIngredientLoading = state =>
	state.cocktails.ingredientLoading

export default cocktailSlice.reducer
