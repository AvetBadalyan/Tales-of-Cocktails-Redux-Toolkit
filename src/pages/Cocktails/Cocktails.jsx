import CocktailList from '@components/CocktailList/CocktailList'
import Filters from '@components/Filters/Filters'
import RecentlyViewed from '@components/RecentlyViewed/RecentlyViewed'
import SearchInput from '@components/Search/SearchInput'
import { fetchCocktails, selectCocktails } from '@redux/features/cocktailSlice'
import { fetchRandomCocktail } from '@services/cocktailApi'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Cocktails.scss'

export default function Cocktails() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const cocktails = useSelector(selectCocktails)

	useEffect(() => {
		if (cocktails.length === 0) {
			dispatch(fetchCocktails())
		}
	}, [cocktails.length, dispatch])

	const handleSurprise = async () => {
		try {
			const data = await fetchRandomCocktail()
			navigate(`/cocktail/${data.drinks[0].idDrink}`)
		} catch (err) {
			console.error('Failed to get random cocktail:', err)
		}
	}

	return (
		<div className="cocktails-page">
			<div className="cocktails-page__top-bar">
				<SearchInput />
				<button
					className="cocktails-page__surprise-btn"
					onClick={handleSurprise}
				>
					🎲 Surprise Me
				</button>
			</div>
			<Filters />
			<RecentlyViewed />
			<CocktailList />
		</div>
	)
}
