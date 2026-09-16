import { SingleCocktailSkeleton } from '@components/Skeleton/Skeleton'
import { useFavorites, useRecentlyViewed } from '@hooks'
import {
	fetchSingleCocktail,
	selectCurrentCocktail,
	selectLoading
} from '@redux/features/cocktailSlice'
import { getThumbUrl, normalizeCocktail } from '@services/cocktailApi'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './SingleCocktail.scss'

export default function SingleCocktail() {
	const { id } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const cocktail = useSelector(selectCurrentCocktail)
	const loading = useSelector(selectLoading)
	const { isFavorite, toggleFavorite } = useFavorites()
	const { addToRecentlyViewed } = useRecentlyViewed()

	useEffect(() => {
		dispatch(fetchSingleCocktail({ id }))
	}, [id, dispatch])

	const cocktailData = useMemo(() => normalizeCocktail(cocktail), [cocktail])

	// Track recently viewed
	useEffect(() => {
		if (cocktailData) {
			addToRecentlyViewed({
				id: cocktailData.id,
				name: cocktailData.name,
				image: cocktailData.image
			})
		}
	}, [cocktailData, addToRecentlyViewed])

	const favorited = isFavorite(id)

	const handleFavorite = () => {
		if (cocktailData) {
			toggleFavorite({
				id: cocktailData.id,
				name: cocktailData.name,
				image: cocktailData.image
			})
		}
	}

	return (
		<div className="single-cocktail">
			<button className="single-cocktail__back" onClick={() => navigate(-1)}>
				← Back
			</button>

			{loading && <SingleCocktailSkeleton />}

			{!loading && !cocktailData && (
				<div className="single-cocktail__not-found">
					<h2>Cocktail not found</h2>
					<Link to="/cocktails">
						<button>Browse All Cocktails</button>
					</Link>
				</div>
			)}

			{!loading && cocktailData && (
				<div className="single-cocktail__content">
					<div className="single-cocktail__image-container">
						<img
							src={getThumbUrl(cocktailData.image, 'medium')}
							alt={cocktailData.name}
						/>
					</div>

					<div className="single-cocktail__info">
						<h1 className="single-cocktail__name">{cocktailData.name}</h1>

						<button
							className={`single-cocktail__favorite ${favorited ? 'single-cocktail__favorite--active' : ''}`}
							onClick={handleFavorite}
						>
							{favorited ? '♥ Saved' : '♡ Save to Favorites'}
						</button>

						<div className="single-cocktail__details">
							<p>
								<span className="single-cocktail__label">Category:</span>
								<span className="single-cocktail__value">
									{cocktailData.category}
								</span>
							</p>
							<p>
								<span className="single-cocktail__label">Info:</span>
								<span className="single-cocktail__value">
									{cocktailData.info}
								</span>
							</p>
							<p>
								<span className="single-cocktail__label">Glass:</span>
								<span className="single-cocktail__value">
									{cocktailData.glass}
								</span>
							</p>
						</div>

						<div className="single-cocktail__instructions">
							<p>
								<span className="single-cocktail__label">Instructions:</span>
							</p>
							<p className="single-cocktail__value">
								{cocktailData.instructions}
							</p>
						</div>

						<div className="single-cocktail__ingredients">
							<p>
								<span className="single-cocktail__label">Ingredients:</span>
							</p>
							<ul className="single-cocktail__ingredients-list">
								{cocktailData.ingredients.map((ing, i) => (
									<li key={i}>
										<Link
											to={`/ingredient/${encodeURIComponent(ing.name)}`}
											className="single-cocktail__ingredient-link"
										>
											{ing.name}
										</Link>
										{ing.measure && (
											<span className="single-cocktail__measure">
												{' '}
												- {ing.measure}
											</span>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
