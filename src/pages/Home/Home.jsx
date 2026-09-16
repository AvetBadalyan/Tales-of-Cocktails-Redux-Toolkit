import { Skeleton } from '@components/Skeleton/Skeleton'
import { useLocalStorage } from '@hooks'
import {
	fetchRandomCocktail,
	getThumbUrl,
	normalizeCocktail
} from '@services/cocktailApi'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'

const getTodayString = () => new Date().toISOString().split('T')[0]

export default function Home() {
	const [cotd, setCotd] = useLocalStorage('toc_cotd', null)
	const [loading, setLoading] = useState(() => cotd?.date !== getTodayString())

	useEffect(() => {
		// Only fetch when there's no cached cocktail for today.
		if (cotd?.date === getTodayString()) return

		let active = true

		fetchRandomCocktail()
			.then(data => {
				if (!active) return
				const drink = normalizeCocktail(data.drinks?.[0])
				if (!drink) return
				setCotd({
					date: getTodayString(),
					cocktail: { id: drink.id, name: drink.name, image: drink.image }
				})
			})
			.catch(err => {
				console.error('Failed to fetch cocktail of the day:', err)
			})
			.finally(() => {
				if (active) setLoading(false)
			})

		return () => {
			active = false
		}
		// Run once on mount; cotd is read as an initial condition, not a trigger.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="home">
			<div className="home__hero">
				<div className="home__cotd">
					<p className="home__cotd-label">Cocktail of the Day</p>

					{loading && (
						<div className="home__cotd-loading">
							<Skeleton variant="rect" width="18rem" height="18rem" />
							<Skeleton variant="text" width="14rem" height="2.4rem" />
						</div>
					)}

					{!loading && cotd?.cocktail && (
						<Link
							to={`/cocktail/${cotd.cocktail.id}`}
							className="home__cotd-card"
						>
							<img
								src={getThumbUrl(cotd.cocktail.image, 'medium')}
								alt={cotd.cocktail.name}
								className="home__cotd-image"
							/>
							<p className="home__cotd-name">{cotd.cocktail.name}</p>
						</Link>
					)}
				</div>

				<Link to="/cocktails">
					<button className="home__cta">Explore All Cocktails 🍸</button>
				</Link>
			</div>
		</div>
	)
}
