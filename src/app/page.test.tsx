import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
	it('renders links', () => {
		render(<Home />);

		// TODO: Test rendering based on cookies
	});
});
