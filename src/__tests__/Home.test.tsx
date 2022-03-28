import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Home from '../pages/Home';

describe('Home page', () => {
	test('it should render a SearchItem after typing a valid SearchTerm', async () => {
    const { getByRole, findByRole, debug } = render(
      <Home />
    );
    
    userEvent.type(getByRole('searchbox'), 'Wolverine');

    const SearchResult = await findByRole('img', { name: 'Wolverine' });
    debug();

    expect(SearchResult).toBeInTheDocument();
	});
});