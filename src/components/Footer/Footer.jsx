import './Footer.scss'

export default function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="footer">
			<div className="footer__content">
				<p className="footer__copyright">
					© {currentYear} Tales of Cocktails. All rights reserved.
				</p>
				<p className="footer__attribution">
					Data provided by{' '}
					<a
						href="https://www.thecocktaildb.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						TheCocktailDB
					</a>
				</p>
				<p className="footer__disclaimer">Always drink responsibly. 🥂</p>
			</div>
		</footer>
	)
}
