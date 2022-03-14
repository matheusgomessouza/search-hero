import React from 'react';
import { Card, Image, Title } from './styles';

interface ICardProps {
  thumbnail: string;
  name: string;
}

export default function SearchResultItem({thumbnail, name}: ICardProps) {
	return (
		<Card>
			<Image src={thumbnail} alt={name}/>
			<Title>{name}</Title>
		</Card>
	);
}