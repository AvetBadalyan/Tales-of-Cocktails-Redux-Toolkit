import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'toc_favorites'

// Load favorites from localStorage
const loadFavorites = () => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY)
		return stored ? JSON.parse(stored) : []
	} catch {
		return []
	}
}

// Save favorites to localStorage
const saveFavorites = favorites => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
	} catch (error) {
		console.warn('Failed to save favorites to localStorage:', error)
	}
}

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState: {
		favorites: loadFavorites()
	},
	reducers: {
		addFavorite: (state, action) => {
			const exists = state.favorites.find(f => f.id === action.payload.id)
			if (!exists) {
				state.favorites.push(action.payload)
				saveFavorites(state.favorites)
			}
		},
		removeFavorite: (state, action) => {
			state.favorites = state.favorites.filter(f => f.id !== action.payload)
			saveFavorites(state.favorites)
		}
	}
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions

// Selectors
export const selectFavorites = state => state.favorites.favorites
export const selectFavoritesCount = state => state.favorites.favorites.length

export default favoritesSlice.reducer
