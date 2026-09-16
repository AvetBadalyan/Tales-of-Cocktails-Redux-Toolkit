import './About.scss'

const cards = [
	{
		icon: '🍹',
		title: 'What is Tales of Cocktails?',
		text: "Your go-to guide for discovering cocktail recipes from around the world. Whether you're a curious beginner or a seasoned mixologist, there's always a new drink waiting to be explored."
	},
	{
		icon: '🔍',
		title: 'Explore the Collection',
		text: 'Browse 160+ recipes across alcoholic, non-alcoholic, and optional alcohol categories. Filter by category, browse A–Z, or search by name instantly.'
	},
	{
		icon: '📋',
		title: 'Full Recipe Details',
		text: 'Every cocktail page shows ingredients (each linking to its own ingredient page), step-by-step instructions, glass type, and category — all sourced live from the CocktailDB API.'
	},
	{
		icon: '🎲',
		title: 'Discover Something New',
		text: "Not sure what to try? Hit Surprise Me for a random pick, check today's Cocktail of the Day on the home page, or revisit your recently viewed drinks."
	},
	{
		icon: '❤️',
		title: 'Save Your Favorites',
		text: 'Found something you love? Save it to your Favorites with one tap. Your list is stored locally and persists across visits — no account needed.'
	},
	{
		icon: '⚙️',
		title: 'Built With Modern Tech',
		text: 'React 19 · Redux Toolkit · React Router v6 · Vite · SCSS · CocktailDB API · Firebase Hosting. Clean component architecture, lazy loading, custom hooks, and fully responsive design.'
	}
]

export default function About() {
	return (
		<section className="about">
			<div className="about__hero">
				<h1 className="about__title">Tales of Cocktails</h1>
				<p className="about__subtitle">
					A cocktail encyclopedia in your browser.
				</p>
			</div>

			<div className="about__grid">
				{cards.map((card, index) => (
					<article
						key={card.title}
						className="about__card"
						style={{ animationDelay: `${index * 0.1}s` }}
					>
						<span className="about__card-icon">{card.icon}</span>
						<h2 className="about__card-title">{card.title}</h2>
						<p className="about__card-text">{card.text}</p>
					</article>
				))}
			</div>

			<p className="about__footer">Always drink responsibly. Cheers! 🥂</p>
		</section>
	)
}
