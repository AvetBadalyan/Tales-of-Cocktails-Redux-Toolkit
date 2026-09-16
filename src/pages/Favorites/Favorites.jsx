import { useFavorites } from '@hooks'
import { getThumbUrl } from '@services/cocktailApi'
import { Link } from 'react-router-dom'
import './Favorites.scss'

export default function Favorites() {
	const { favorites, removeFromFavorites } = useFavorites()

	return (
		<div className="favorites">
			<h1 className="favorites__title">Your Favorites</h1>

			{favorites.length === 0 && (
				<div className="favorites__empty">
					<span className="favorites__empty-icon">💔</span>
					<p>No favorites yet.</p>
					<p>Hit ♥ on any cocktail to save it here.</p>
					<Link to="/cocktails">
						<button>Browse Cocktails</button>
					</Link>
				</div>
			)}

			{favorites.length > 0 && (
				<div className="favorites__grid">
					{favorites.map((item, index) => (
						<div
							key={item.id}
							className="favorites__card"
							style={{ animationDelay: `${index * 0.05}s` }}
						>
							<Link
								to={`/cocktail/${item.id}`}
								className="favorites__card-image"
							>
								<img
									src={getThumbUrl(item.image)}
									alt={item.name}
									loading="lazy"
								/>
							</Link>

							<div className="favorites__card-body">
								<p className="favorites__card-name">{item.name}</p>

								<div className="favorites__card-actions">
									<Link to={`/cocktail/${item.id}`}>
										<button className="favorites__btn-details">Details</button>
									</Link>
									<button
										className="favorites__btn-remove"
										onClick={() => removeFromFavorites(item.id)}
									>
										Remove ♥
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
