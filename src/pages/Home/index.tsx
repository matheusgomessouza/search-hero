import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getHeroLabelService } from '../../services/search-hero.service';
import { useDebounce } from '../../hooks/useDebounce';
import SearchResultItem from '../../components/SearchResult';

import { Background, Form, Heading, Search, ResultsContainer, Message } from './styles';

export default function Home() {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data: heroes, isLoading, isError } = useQuery({
		queryKey: ['heroSearch', debouncedSearchTerm],
		queryFn: () => getHeroLabelService(debouncedSearchTerm),
		enabled: debouncedSearchTerm.length > 3, // Prevent searching for very short strings
		staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
	});

	return (
		<Background>
			<Form as='main'>
				<Heading>Explore the Multiverse</Heading>
				<Search 
					type='search' 
					placeholder='Search for a hero or villain...' 
					value={searchTerm} 
					onChange={(e) => setSearchTerm(e.target.value)}
					aria-label='Search Marvel Characters'
				/>
				<ResultsContainer aria-live='polite'>
					{isLoading && debouncedSearchTerm.length > 3 && (
						<Message>Scanning S.H.I.E.L.D. databases...</Message>
					)}
					{isError && (
						<Message role='alert'>Error accessing files. Please try again later.</Message>
					)}
					{!isLoading && !isError && heroes && heroes.length === 0 && (
						<Message>No entities found matching "{debouncedSearchTerm}".</Message>
					)}
					{!isLoading && heroes && heroes.map(result => (
						<SearchResultItem
							key={result.id}
							id={result.id} 
							thumbnail={result.thumbnail.path}
							name={result.name}
						/>
					))}
				</ResultsContainer>
			</Form>
		</Background>
	);
}
