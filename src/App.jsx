import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '@components/Header/Header'
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary'
import './App.scss'

// Lazy load pages for better performance
const Home = lazy(() => import('@pages/Home/Home'))
const About = lazy(() => import('@pages/About/About'))
const Cocktails = lazy(() => import('@pages/Cocktails/Cocktails'))
const SingleCocktail = lazy(
	() => import('@pages/SingleCocktail/SingleCocktail')
)
const Favorites = lazy(() => import('@pages/Favorites/Favorites'))
const Ingredient = lazy(() => import('@pages/Ingredient/Ingredient'))
const NotFound = lazy(() => import('@pages/NotFound/NotFound'))

// Loading fallback component
const PageLoader = () => (
	<div className="page-loader">
		<div className="page-loader__spinner" />
		<p>Loading...</p>
	</div>
)

function App() {
	return (
		<div className="app">
			<Header />
			<main className="main-content">
				<ErrorBoundary>
					<Suspense fallback={<PageLoader />}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/cocktails" element={<Cocktails />} />
							<Route path="/cocktail/:id" element={<SingleCocktail />} />
							<Route path="/favorites" element={<Favorites />} />
							<Route path="/ingredient/:name" element={<Ingredient />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
				</ErrorBoundary>
			</main>
		</div>
	)
}

export default App
