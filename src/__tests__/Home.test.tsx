import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Home';

describe('Home page', () => {
	test('it should render a SearchItem after typing a valid SearchTerm', async () => {
		render(
			<Home />
		);

		userEvent.type(screen.getByRole('searchbox'), 'Wolverine');
		const SearchResult = await screen.findByRole('img', { name: 'Wolverine' });
		expect(SearchResult).toBeInTheDocument();
	});
});