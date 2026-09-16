import './Skeleton.scss'

/**
 * Reusable skeleton loading component
 */
export const Skeleton = ({
	variant = 'rect',
	width,
	height,
	className = ''
}) => {
	const style = {
		width: width || '100%',
		height: height || '1.6rem'
	}

	return (
		<div
			className={`skeleton skeleton--${variant} ${className}`}
			style={style}
			aria-hidden="true"
		/>
	)
}

/**
 * Skeleton for cocktail cards
 */
export const CocktailCardSkeleton = () => (
	<div className="skeleton-card">
		<div className="skeleton-card__image">
			<Skeleton variant="rect" height="100%" />
		</div>
		<div className="skeleton-card__divider" />
		<div className="skeleton-card__body">
			<Skeleton variant="text" width="80%" height="1.4rem" />
			<Skeleton variant="text" width="60%" height="1.2rem" />
			<Skeleton variant="text" width="50%" height="1.2rem" />
			<Skeleton
				variant="rect"
				width="10rem"
				height="3.6rem"
				className="skeleton-card__button"
			/>
		</div>
	</div>
)

/**
 * Skeleton for cocktail list
 */
export const CocktailListSkeleton = ({ count = 6 }) => (
	<div className="cocktail-list-skeleton">
		{Array.from({ length: count }).map((_, i) => (
			<CocktailCardSkeleton key={i} />
		))}
	</div>
)

/**
 * Skeleton for single cocktail page
 */
export const SingleCocktailSkeleton = () => (
	<div className="single-cocktail-skeleton">
		<div className="single-cocktail-skeleton__image">
			<Skeleton variant="rect" height="100%" />
		</div>
		<div className="single-cocktail-skeleton__info">
			<Skeleton variant="text" width="70%" height="3.2rem" />
			<Skeleton variant="rect" width="16rem" height="4rem" />
			<Skeleton variant="text" width="40%" height="1.6rem" />
			<Skeleton variant="text" width="35%" height="1.6rem" />
			<Skeleton variant="text" width="45%" height="1.6rem" />
			<Skeleton variant="text" width="100%" height="8rem" />
			<Skeleton variant="text" width="80%" height="1.6rem" />
		</div>
	</div>
)

export default Skeleton
