import { configureStore } from '@reduxjs/toolkit'
import cocktailReducer from './features/cocktailSlice'
import favoritesReducer from './features/favoritesSlice'

const store = configureStore({
	reducer: {
		cocktails: cocktailReducer,
		favorites: favoritesReducer
	},
	devTools: import.meta.env.DEV
})

export default store
