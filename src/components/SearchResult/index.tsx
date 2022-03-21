import { Link } from 'react-router-dom';
import { Card, Image, Title } from './styles';

interface ICardProps {
  thumbnail: string;
  name: string;
	id: number;
}

export default function SearchResultItem({thumbnail, name, id}: ICardProps) {
	return (
		<Card>
			<Image src={thumbnail} alt={name} />
	
			<Title>{name}</Title>
			<Link to={`/hero/${id}`}>SEE INFO</Link>
		</Card>
	);
}