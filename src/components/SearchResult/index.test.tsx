import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchResultItem from './index';

describe('SearchResultItem Component', () => {
	const defaultProps = {
		id: 1,
		name: 'Spider-Man',
		thumbnail: 'http://example.com/spider-man.jpg',
	};

	const setup = (props = defaultProps) => {
		return render(
			<MemoryRouter>
				<SearchResultItem {...props} />
			</MemoryRouter>
		);
	};

	it('renders the character name and image correctly', () => {
		setup();
		const nameElement = screen.getByText('Spider-Man');
		const imageElement = screen.getByAltText('Portrait of Spider-Man');
		expect(nameElement).toBeInTheDocument();
		expect(imageElement).toHaveAttribute('src', 'http://example.com/spider-man.jpg');
	});

	it('renders the fallback image if thumbnail contains image_not_available', () => {
		setup({ ...defaultProps, thumbnail: 'http://example.com/image_not_available.jpg' });
		const imageElement = screen.getByAltText('Portrait of Spider-Man');
		expect(imageElement).toHaveAttribute('src', 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg');
	});

	it('renders the fallback image if thumbnail is invalid (undefined/null string)', () => {
		setup({ ...defaultProps, thumbnail: 'undefined.jpg' });
		const imageElement = screen.getByAltText('Portrait of Spider-Man');
		expect(imageElement).toHaveAttribute('src', 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg');
	});

	it('renders a disabled state with DATA CORRUPTED when id is null', () => {
		setup({ ...defaultProps, id: null });
		const disabledText = screen.getByText('DATA CORRUPTED');
		expect(disabledText).toBeInTheDocument();
    
		// Ensure the card is rendered as a non-link article
		const article = screen.getByLabelText(/Details unavailable for Spider-Man/i);
		expect(article.tagName).toBe('ARTICLE');
	});
});
