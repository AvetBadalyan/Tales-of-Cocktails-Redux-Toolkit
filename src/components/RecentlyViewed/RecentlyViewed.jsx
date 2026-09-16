import { useRecentlyViewed } from '@hooks'
import { getThumbUrl } from '@services/cocktailApi'
import { Link } from 'react-router-dom'
import './RecentlyViewed.scss'

export default function RecentlyViewed() {
	const { recentlyViewed } = useRecentlyViewed()

	if (recentlyViewed.length === 0) return null

	return (
		<div className="recently-viewed">
			<p className="recently-viewed__label">Recently Viewed</p>
			<div className="recently-viewed__list">
				{recentlyViewed.map(item => (
					<Link
						key={item.id}
						to={`/cocktail/${item.id}`}
						className="recently-viewed__item"
					>
						<img src={getThumbUrl(item.image)} alt={item.name} loading="lazy" />
						<span>{item.name}</span>
					</Link>
				))}
			</div>
		</div>
	)
}
