import Pagination from '@components/Pagination/Pagination'
import { CocktailListSkeleton } from '@components/Skeleton/Skeleton'
import {
	selectCocktails,
	selectCurrentPage,
	selectLoading,
	setPage
} from '@redux/features/cocktailSlice'
import { getThumbUrl, normalizeCocktail } from '@services/cocktailApi'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './CocktailList.scss'

const ITEMS_PER_PAGE = 10

export default function CocktailList() {
	const cocktails = useSelector(selectCocktails)
	const loading = useSelector(selectLoading)
	const currentPage = useSelector(selectCurrentPage)
	const dispatch = useDispatch()

	const modifiedCocktails = useMemo(
		() => cocktails.map(normalizeCocktail),
		[cocktails]
	)

	const totalPages = Math.ceil(modifiedCocktails.length / ITEMS_PER_PAGE)
	const start = (currentPage - 1) * ITEMS_PER_PAGE
	const paginated = useMemo(
		() => modifiedCocktails.slice(start, start + ITEMS_PER_PAGE),
		[modifiedCocktails, start]
	)

	if (loading) {
		return (
			<section className="cocktail-list">
				<h2 className="cocktail-list__title">Sweet, Yummy & Delicious</h2>
				<CocktailListSkeleton count={6} />
			</section>
		)
	}

	if (cocktails.length === 0) {
		return (
			<section className="cocktail-list">
				<div className="cocktail-list__empty">
					<h2>No cocktails found</h2>
					<p>Try a different search or filter</p>
				</div>
			</section>
		)
	}

	return (
		<section className="cocktail-list">
			<h2 className="cocktail-list__title">Sweet, Yummy & Delicious</h2>

			<p className="cocktail-list__stats">
				Showing {start + 1}–{start + paginated.length} of{' '}
				{modifiedCocktails.length} cocktails
			</p>

			<div className="cocktail-list__grid">
				{paginated.map((item, index) => (
					<CocktailCard
						key={item.id}
						cocktail={item}
						isReverse={index % 2 === 1}
						index={index}
					/>
				))}
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={page => dispatch(setPage(page))}
			/>
		</section>
	)
}

function CocktailCard({ cocktail, isReverse, index }) {
	const { id, name, image, info, glass } = cocktail

	return (
		<article
			className={`cocktail-card ${isReverse ? 'cocktail-card--reverse' : ''}`}
			style={{ animationDelay: `${index * 0.07}s` }}
		>
			<div className="cocktail-card__image">
				<img src={getThumbUrl(image)} alt={name} loading="lazy" />
			</div>

			<div className="cocktail-card__divider" />

			<div className="cocktail-card__body">
				<h3 className="cocktail-card__name">Name: {name}</h3>
				{glass && <p className="cocktail-card__glass">Glass: {glass}</p>}
				{info && <p className="cocktail-card__info">Info: {info}</p>}
				<Link to={`/cocktail/${id}`}>
					<button className="cocktail-card__btn">Details</button>
				</Link>
			</div>
		</article>
	)
}
