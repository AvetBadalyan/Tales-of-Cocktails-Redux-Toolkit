import { useState, useCallback } from 'react'

/**
 * Custom hook for managing localStorage with React state
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Default value if key doesn't exist
 * @returns {[*, Function, Function]} - [value, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
	// Get stored value or use initial value
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error)
			return initialValue
		}
	})

	// Setter function that updates both state and localStorage
	const setValue = useCallback(
		value => {
			try {
				// Allow value to be a function for same API as useState
				const valueToStore =
					value instanceof Function ? value(storedValue) : value
				setStoredValue(valueToStore)
				window.localStorage.setItem(key, JSON.stringify(valueToStore))
			} catch (error) {
				console.warn(`Error setting localStorage key "${key}":`, error)
			}
		},
		[key, storedValue]
	)

	// Remove the item from localStorage
	const removeValue = useCallback(() => {
		try {
			window.localStorage.removeItem(key)
			setStoredValue(initialValue)
		} catch (error) {
			console.warn(`Error removing localStorage key "${key}":`, error)
		}
	}, [key, initialValue])

	return [storedValue, setValue, removeValue]
}

export default useLocalStorage
