import logo from '@assets/cocktails-logo-neon-light.jpg'
import { selectFavoritesCount } from '@redux/features/favoritesSlice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import './Header.scss'

const navLinks = [
	{ to: '/', label: 'Home' },
	{ to: '/cocktails', label: 'Cocktails' },
	{ to: '/favorites', label: 'Favorites', showBadge: true },
	{ to: '/about', label: 'About' }
]

export default function Header() {
	const favoritesCount = useSelector(selectFavoritesCount)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const location = useLocation()

	// Close menu on route change
	useEffect(() => {
		setIsMenuOpen(false)
	}, [location.pathname])

	// Prevent body scroll when menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isMenuOpen])

	const toggleMenu = () => setIsMenuOpen(prev => !prev)

	return (
		<header className="header">
			<nav className="header__nav">
				<NavLink to="/" className="header__logo">
					<img src={logo} alt="Tales of Cocktails" />
				</NavLink>

				<h1 className="header__title">Tales of Cocktails</h1>

				{/* Desktop Navigation */}
				<ul className="header__links">
					{navLinks.map(({ to, label, showBadge }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) =>
									`header__link ${isActive ? 'header__link--active' : ''}`
								}
							>
								{label}
								{showBadge && favoritesCount > 0 && (
									<span className="header__badge">{favoritesCount}</span>
								)}
							</NavLink>
						</li>
					))}
				</ul>

				{/* Mobile Menu Button */}
				<button
					className={`header__menu-btn ${isMenuOpen ? 'header__menu-btn--open' : ''}`}
					onClick={toggleMenu}
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={isMenuOpen}
				>
					<span className="header__menu-icon" />
				</button>
			</nav>

			{/* Mobile Navigation Overlay */}
			<div
				className={`header__overlay ${isMenuOpen ? 'header__overlay--open' : ''}`}
				onClick={() => setIsMenuOpen(false)}
			/>

			{/* Mobile Navigation Menu */}
			<div
				className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu--open' : ''}`}
			>
				<ul className="header__mobile-links">
					{navLinks.map(({ to, label, showBadge }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) =>
									`header__mobile-link ${isActive ? 'header__mobile-link--active' : ''}`
								}
							>
								{label}
								{showBadge && favoritesCount > 0 && (
									<span className="header__badge">{favoritesCount}</span>
								)}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</header>
	)
}
