import { useDebounce } from '@hooks'
import {
	fetchCocktails,
	fetchSearchCocktail,
	setActiveFilter
} from '@redux/features/cocktailSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './SearchInput.scss'

export default function SearchInput() {
	const [searchText, setSearchText] = useState('')
	const debouncedSearch = useDebounce(searchText, 500)
	const dispatch = useDispatch()

	useEffect(() => {
		if (debouncedSearch.trim()) {
			dispatch(setActiveFilter(null))
			dispatch(fetchSearchCocktail({ searchText: debouncedSearch.trim() }))
		} else if (debouncedSearch === '') {
			dispatch(fetchCocktails())
		}
	}, [debouncedSearch, dispatch])

	const handleClear = () => {
		setSearchText('')
	}

	return (
		<div className="search">
			<form className="search__form" onSubmit={e => e.preventDefault()}>
				<span className="search__icon" aria-hidden="true">
					🔍
				</span>
				<input
					type="text"
					className="search__input"
					value={searchText}
					onChange={e => setSearchText(e.target.value)}
					placeholder="Search cocktails..."
					aria-label="Search cocktails"
				/>
				{searchText && (
					<button
						type="button"
						className="search__clear"
						onClick={handleClear}
						aria-label="Clear search"
					>
						✕
					</button>
				)}
			</form>
		</div>
	)
}
