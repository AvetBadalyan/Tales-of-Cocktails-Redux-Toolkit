// ===========================================
// COCKTAILDB API SERVICE
// ===========================================

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1'

/**
 * Generic fetch wrapper with error handling
 */
const fetchApi = async endpoint => {
	const response = await fetch(`${BASE_URL}${endpoint}`)
	if (!response.ok) {
		throw new Error(`API Error: ${response.status} ${response.statusText}`)
	}
	return response.json()
}

/**
 * Fetch all cocktails by alcohol type (Alcoholic, Non-Alcoholic, Optional)
 */
export const fetchAllCocktails = async () => {
	const categories = [
		{ filter: 'Alcoholic', label: 'Alcoholic' },
		{ filter: 'Non_Alcoholic', label: 'Non alcoholic' },
		{ filter: 'Optional_alcohol', label: 'Optional alcohol' }
	]

	const responses = await Promise.all(
		categories.map(({ filter }) => fetchApi(`/filter.php?a=${filter}`))
	)

	const drinks = responses.flatMap((res, i) =>
		Array.isArray(res.drinks)
			? res.drinks.map(d => ({ ...d, strAlcoholic: categories[i].label }))
			: []
	)

	return { drinks }
}

/**
 * Fetch a single cocktail by ID
 */
export const fetchCocktailById = async id => {
	return fetchApi(`/lookup.php?i=${id}`)
}

/**
 * Search cocktails by name
 */
export const searchCocktails = async searchText => {
	return fetchApi(`/search.php?s=${encodeURIComponent(searchText)}`)
}

/**
 * Fetch all available categories
 */
export const fetchCocktailCategories = async () => {
	return fetchApi('/list.php?c=list')
}

/**
 * Fetch cocktails by category
 */
export const fetchCocktailsByCategory = async category => {
	return fetchApi(`/filter.php?c=${encodeURIComponent(category)}`)
}

/**
 * Fetch cocktails by first letter
 */
export const fetchCocktailsByLetter = async letter => {
	return fetchApi(`/search.php?f=${letter}`)
}

/**
 * Fetch cocktails that start with digits (0-9)
 */
export const fetchCocktailsByDigits = async () => {
	const responses = await Promise.all(
		'0123456789'.split('').map(d => fetchApi(`/search.php?f=${d}`))
	)

	const drinks = responses.flatMap(res =>
		Array.isArray(res.drinks) ? res.drinks : []
	)

	return { drinks }
}

/**
 * Fetch ingredient info and cocktails containing it
 */
export const fetchIngredientData = async name => {
	const [infoRes, cocktailsRes] = await Promise.all([
		fetchApi(`/search.php?i=${encodeURIComponent(name)}`),
		fetchApi(`/filter.php?i=${encodeURIComponent(name)}`)
	])

	return { info: infoRes, cocktails: cocktailsRes }
}

/**
 * Fetch a random cocktail
 */
export const fetchRandomCocktail = async () => {
	return fetchApi('/random.php')
}

/**
 * Get ingredient image URL
 */
export const getIngredientImageUrl = (name, size = 'medium') => {
	return `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(name)}-${size}.png`
}

/**
 * Build a sized cocktail thumbnail URL.
 * TheCocktailDB serves resized images by appending /small, /medium or /large
 * to the raw strDrinkThumb URL. Pass size = null for the original.
 */
export const getThumbUrl = (thumb, size = 'small') => {
	if (!thumb) return thumb
	return size ? `${thumb}/${size}` : thumb
}

/**
 * Normalize a raw CocktailDB drink object into the shape used across the UI.
 * Keeps the raw (unsized) thumbnail so callers can request any size via getThumbUrl.
 */
export const normalizeCocktail = drink => {
	if (!drink) return null
	return {
		id: drink.idDrink,
		name: drink.strDrink,
		image: drink.strDrinkThumb,
		info: drink.strAlcoholic,
		glass: drink.strGlass,
		category: drink.strCategory,
		instructions: drink.strInstructions,
		ingredients: parseCocktailIngredients(drink)
	}
}

/**
 * Parse cocktail data to extract ingredients with measures
 */
export const parseCocktailIngredients = cocktail => {
	const ingredients = []
	for (let i = 1; i <= 15; i++) {
		const ingredient = cocktail[`strIngredient${i}`]
		const measure = cocktail[`strMeasure${i}`]
		if (ingredient && ingredient.trim()) {
			ingredients.push({
				name: ingredient.trim(),
				measure: measure?.trim() || ''
			})
		}
	}
	return ingredients
}

export default {
	fetchAllCocktails,
	fetchCocktailById,
	searchCocktails,
	fetchCocktailCategories,
	fetchCocktailsByCategory,
	fetchCocktailsByLetter,
	fetchCocktailsByDigits,
	fetchIngredientData,
	fetchRandomCocktail,
	getIngredientImageUrl,
	getThumbUrl,
	normalizeCocktail,
	parseCocktailIngredients
}
