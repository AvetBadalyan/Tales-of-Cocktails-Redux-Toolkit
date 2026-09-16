import {
	addFavorite,
	removeFavorite,
	selectFavorites
} from '@redux/features/favoritesSlice'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * Custom hook for managing favorite cocktails
 * @returns {Object} - { favorites, favoritesCount, isFavorite, toggleFavorite, addToFavorites, removeFromFavorites }
 */
export const useFavorites = () => {
	const dispatch = useDispatch()
	const favorites = useSelector(selectFavorites)

	const isFavorite = useCallback(
		id => favorites.some(f => f.id === id),
		[favorites]
	)

	const addToFavorites = useCallback(
		cocktail => {
			if (!cocktail || !cocktail.id) return
			dispatch(addFavorite(cocktail))
		},
		[dispatch]
	)

	const removeFromFavorites = useCallback(
		id => {
			dispatch(removeFavorite(id))
		},
		[dispatch]
	)

	const toggleFavorite = useCallback(
		cocktail => {
			if (isFavorite(cocktail.id)) {
				removeFromFavorites(cocktail.id)
			} else {
				addToFavorites(cocktail)
			}
		},
		[isFavorite, addToFavorites, removeFromFavorites]
	)

	return {
		favorites,
		favoritesCount: favorites.length,
		isFavorite,
		toggleFavorite,
		addToFavorites,
		removeFromFavorites
	}
}

export default useFavorites
