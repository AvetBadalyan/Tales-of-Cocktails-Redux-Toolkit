import { Link } from 'react-router-dom'
import './NotFound.scss'

export default function NotFound() {
	return (
		<div className="not-found">
			<div className="not-found__content">
				<span className="not-found__icon">🍸</span>
				<h1 className="not-found__title">404</h1>
				<h2 className="not-found__subtitle">Page Not Found</h2>
				<p className="not-found__text">
					Looks like this cocktail got lost on the way to the bar.
				</p>
				<div className="not-found__actions">
					<Link to="/">
						<button>Go Home</button>
					</Link>
					<Link to="/cocktails">
						<button>Browse Cocktails</button>
					</Link>
				</div>
			</div>
		</div>
	)
}
