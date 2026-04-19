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
	let testQueryClient: QueryClient;

	beforeEach(() => {
		testQueryClient = createTestQueryClient();
		jest.clearAllMocks();
	});

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

	test('it should display empty state when no results found', async () => {
		(getHeroLabelService as jest.Mock).mockResolvedValue([]);
		const user = userEvent.setup();

		render(
			<QueryClientProvider client={testQueryClient}>
				<MemoryRouter>
					<Home />
				</MemoryRouter>
			</QueryClientProvider>
		);

		const searchBox = screen.getByRole('searchbox');
		await user.type(searchBox, 'NonExistentHero123');

		const emptyMessage = await screen.findByText(/No entities found matching "NonExistentHero123"/i, {}, { timeout: 5000 });
		expect(emptyMessage).toBeInTheDocument();
	});

	test('it should not trigger API call for terms 3 chars or less', async () => {
		const user = userEvent.setup();

		render(
			<QueryClientProvider client={testQueryClient}>
				<MemoryRouter>
					<Home />
				</MemoryRouter>
			</QueryClientProvider>
		);

		const searchBox = screen.getByRole('searchbox');
		await user.type(searchBox, 'Wol');

		// Wait for debounce time to pass
		await new Promise((r) => setTimeout(r, 600));

		// Make sure it did not show a scanning message
		const scanningMessage = screen.queryByText(/Scanning S.H.I.E.L.D. databases/i);
		expect(scanningMessage).not.toBeInTheDocument();
		expect(getHeroLabelService).not.toHaveBeenCalled();
	});
});
