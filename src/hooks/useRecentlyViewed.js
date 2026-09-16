import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'toc_recently_viewed'
const MAX_ITEMS = 5

/**
 * Custom hook for managing recently viewed cocktails
 * @returns {Object} - { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed }
 */
export const useRecentlyViewed = () => {
	const [recentlyViewed, setRecentlyViewed] = useLocalStorage(STORAGE_KEY, [])

	const addToRecentlyViewed = useCallback(
		cocktail => {
			if (!cocktail || !cocktail.id) return

			setRecentlyViewed(prev => {
				// Remove if already exists
				const filtered = prev.filter(item => item.id !== cocktail.id)
				// Add to beginning and limit to max items
				return [
					{ id: cocktail.id, name: cocktail.name, image: cocktail.image },
					...filtered
				].slice(0, MAX_ITEMS)
			})
		},
		[setRecentlyViewed]
	)

	const clearRecentlyViewed = useCallback(() => {
		setRecentlyViewed([])
	}, [setRecentlyViewed])

	return {
		recentlyViewed,
		addToRecentlyViewed,
		clearRecentlyViewed
	}
}

export default useRecentlyViewed
