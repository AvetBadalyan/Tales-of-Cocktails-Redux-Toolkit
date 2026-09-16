import { Skeleton } from '@components/Skeleton/Skeleton'
import {
	fetchIngredient,
	selectIngredient,
	selectIngredientCocktails,
	selectIngredientLoading
} from '@redux/features/cocktailSlice'
import { getIngredientImageUrl, getThumbUrl } from '@services/cocktailApi'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Ingredient.scss'

export default function Ingredient() {
	const { name } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const ingredient = useSelector(selectIngredient)
	const cocktails = useSelector(selectIngredientCocktails)
	const loading = useSelector(selectIngredientLoading)

	useEffect(() => {
		dispatch(fetchIngredient({ name }))
	}, [name, dispatch])

	const imageUrl = getIngredientImageUrl(name, 'medium')

	return (
		<div className="ingredient">
			<button className="ingredient__back" onClick={() => navigate(-1)}>
				← Back
			</button>

			{loading && (
				<div className="ingredient__loading">
					<div className="ingredient__hero">
						<Skeleton variant="rect" width="20rem" height="20rem" />
						<div className="ingredient__info">
							<Skeleton variant="text" width="60%" height="3.2rem" />
							<Skeleton variant="text" width="40%" height="1.6rem" />
							<Skeleton variant="text" width="100%" height="10rem" />
						</div>
					</div>
				</div>
			)}

			{!loading && !ingredient && (
				<div className="ingredient__not-found">
					<h2>Ingredient not found</h2>
					<Link to="/cocktails" className="ingredient__browse-link">
						Browse Cocktails
					</Link>
				</div>
			)}

			{!loading && ingredient && (
				<>
					<div className="ingredient__hero">
						<div className="ingredient__image">
							<img src={imageUrl} alt={ingredient.strIngredient} />
						</div>

						<div className="ingredient__info">
							<h1 className="ingredient__name">{ingredient.strIngredient}</h1>

							{ingredient.strType && (
								<p className="ingredient__meta">
									<span className="ingredient__label">Type:</span>
									<span className="ingredient__value">
										{ingredient.strType}
									</span>
								</p>
							)}

							{ingredient.strAlcohol === 'Yes' && ingredient.strABV && (
								<p className="ingredient__meta">
									<span className="ingredient__label">ABV:</span>
									<span className="ingredient__value">
										{ingredient.strABV}%
									</span>
								</p>
							)}

							{ingredient.strDescription && (
								<p className="ingredient__description">
									{ingredient.strDescription}
								</p>
							)}
						</div>
					</div>

					{cocktails.length > 0 && (
						<div className="ingredient__cocktails">
							<h2 className="ingredient__cocktails-title">
								{cocktails.length} cocktails with {ingredient.strIngredient}
							</h2>

							<div className="ingredient__cocktails-grid">
								{cocktails.map((c, index) => (
									<Link
										key={c.idDrink}
										to={`/cocktail/${c.idDrink}`}
										className="ingredient__cocktail-card"
										style={{ animationDelay: `${index * 0.03}s` }}
									>
										<img
											src={getThumbUrl(c.strDrinkThumb)}
											alt={c.strDrink}
											loading="lazy"
										/>
										<span>{c.strDrink}</span>
									</Link>
								))}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	)
}
