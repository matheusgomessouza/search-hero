import React from 'react';
import { useEffect, useState } from 'react';

import { api } from '../../services/api';
import MD5 from 'crypto-js/md5';

import { Background, Form, Heading, Search } from './styles';
import Footer from '../../components/Footer';
import SearchResultItem from '../../components/SearchResult';

interface IHeroProps {
	id: number;
	name: string;
	description: string;
	thumbnail: string | any;
}

export default function Home() {

	// Security Treatement and calling API Marvel
	const ts = new Date().getTime();
	const privateKey = process.env.REACT_APP_PRIVATE_KEY as string;
	const publicKey = process.env.REACT_APP_PUBLIC_KEY as string;
	const mixed = ts + privateKey + publicKey;
	const hash = MD5(mixed).toString();

	const [hero, setHero] = useState<IHeroProps[]>([] as IHeroProps[]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		if (searchTerm !== '') {
			api.get(`/v1/public/characters?name=${searchTerm}&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
				.then(function (response) {
					const heroList = response.data.data.results;
					heroList.forEach((element: IHeroProps) => {
						setHero([{
							id: element.id,
							name: element.name,
							description: element.description,
							thumbnail: element.thumbnail.path + '.jpg',
						}]);
					});					
				})
				.catch(function (error) {
					console.log(error, 'Nothing could be found');
				});
		}
	}, [searchTerm]);


	return (
		<>
			<Background>
				<Form>
					<Heading>Want to know more about some character?</Heading>
					<Search 
						type="search" 
						placeholder="Begin typing..." 
						value={searchTerm} 
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					{console.log(hero)}
					{hero.map(result => (
						<SearchResultItem
							key={result.id} 
							thumbnail={result.thumbnail}
							name={result.name}
						/>
					))}
				</Form>
				<Footer/>
			</Background>
		</>
	);
}
