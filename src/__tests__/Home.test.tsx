import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { getHeroLabelService } from '../services/search-hero.service';

jest.mock('../services/search-hero.service');

describe('Home page', () => {
	test('it should render a SearchItem after typing a valid SearchTerm', async () => {
		(getHeroLabelService as jest.Mock).mockResolvedValue([
			{
				id: 1,
				name: 'Wolverine',
				thumbnail: { path: 'http://example.com/wolverine.jpg' },
			},
		]);

		const user = userEvent.setup();

		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>,
		);

		const searchBox = screen.getByRole('searchbox');
		await user.type(searchBox, 'Wolverine');

		const SearchResult = await screen.findByRole(
			'img',
			{ name: 'Wolverine' },
			{ timeout: 5000 },
		);
		expect(SearchResult).toBeInTheDocument();
	});
});
