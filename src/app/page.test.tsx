import { render, screen } from '@testing-library/react'
import Home from './page'

describe.skip('Home', () => {
	it('renders links', () => {
		render(<Home />)

		// TODO: Test rendering based on cookies
	})
})
