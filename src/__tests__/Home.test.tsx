import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../pages/Home';
import { getHeroLabelService } from '../services/search-hero.service';

jest.mock('../services/search-hero.service');

const createTestQueryClient = () => new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

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
		const testQueryClient = createTestQueryClient();

		render(
			<QueryClientProvider client={testQueryClient}>
				<MemoryRouter>
					<Home />
				</MemoryRouter>
			</QueryClientProvider>
		);

		const searchBox = screen.getByRole('searchbox');
		await user.type(searchBox, 'Wolverine');

		const SearchResult = await screen.findByRole(
			'img',
			{ name: 'Portrait of Wolverine' },
			{ timeout: 5000 },
		);
		expect(SearchResult).toBeInTheDocument();
	});
});
