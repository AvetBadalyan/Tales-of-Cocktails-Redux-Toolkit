import { Component } from 'react'
import './ErrorBoundary.scss'

class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false, error: null }
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error }
	}

	componentDidCatch(error, errorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null })
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="error-boundary">
					<div className="error-boundary__content">
						<span className="error-boundary__icon">🍸</span>
						<h1 className="error-boundary__title">
							Oops! Something went wrong
						</h1>
						<p className="error-boundary__message">
							Looks like we spilled the cocktail. Don&apos;t worry, we&apos;ll
							mix you a fresh one.
						</p>
						<div className="error-boundary__actions">
							<button onClick={this.handleReset}>Try Again</button>
							<button onClick={() => (window.location.href = '/')}>
								Go Home
							</button>
						</div>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
