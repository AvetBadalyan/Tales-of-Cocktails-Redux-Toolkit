import {
	fetchCategories,
	fetchCocktails,
	fetchCocktailsByCategory,
	fetchCocktailsByDigits,
	fetchCocktailsByLetter,
	selectActiveFilter,
	selectCategories,
	setActiveFilter
} from '@redux/features/cocktailSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Filters.scss'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function Filters() {
	const dispatch = useDispatch()
	const categories = useSelector(selectCategories)
	const activeFilter = useSelector(selectActiveFilter)

	useEffect(() => {
		if (categories.length === 0) {
			dispatch(fetchCategories())
		}
	}, [categories.length, dispatch])

	const handleAll = () => {
		dispatch(setActiveFilter(null))
		dispatch(fetchCocktails())
	}

	const handleCategory = cat => {
		dispatch(setActiveFilter({ type: 'category', value: cat }))
		dispatch(fetchCocktailsByCategory({ category: cat }))
	}

	const handleLetter = letter => {
		dispatch(setActiveFilter({ type: 'letter', value: letter }))
		dispatch(fetchCocktailsByLetter({ letter: letter.toLowerCase() }))
	}

	const handleDigits = () => {
		dispatch(setActiveFilter({ type: 'digits', value: '0–9' }))
		dispatch(fetchCocktailsByDigits())
	}

	const isActive = (type, value) =>
		activeFilter?.type === type && activeFilter?.value === value

	return (
		<div className="filters">
			{/* Category Filter */}
			<div className="filters__row">
				<span className="filters__label">Category</span>
				<div className="filters__pills">
					<button
						className={`filters__pill ${!activeFilter ? 'filters__pill--active' : ''}`}
						onClick={handleAll}
					>
						All
					</button>
					{categories.map(cat => (
						<button
							key={cat}
							className={`filters__pill ${isActive('category', cat) ? 'filters__pill--active' : ''}`}
							onClick={() => handleCategory(cat)}
						>
							{cat}
						</button>
					))}
				</div>
			</div>

			{/* A-Z Filter */}
			<div className="filters__row">
				<span className="filters__label">A–Z</span>
				<div className="filters__pills">
					<button
						className={`filters__pill ${!activeFilter ? 'filters__pill--active' : ''}`}
						onClick={handleAll}
					>
						All
					</button>
					<button
						className={`filters__pill filters__pill--letter ${
							isActive('digits', '0–9') ? 'filters__pill--active' : ''
						}`}
						onClick={handleDigits}
					>
						0–9
					</button>
					{LETTERS.map(letter => (
						<button
							key={letter}
							className={`filters__pill filters__pill--letter ${
								isActive('letter', letter) ? 'filters__pill--active' : ''
							}`}
							onClick={() => handleLetter(letter)}
						>
							{letter}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
