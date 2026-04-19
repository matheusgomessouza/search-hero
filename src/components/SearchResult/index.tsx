import { useNavigate } from 'react-router-dom';
import { Card, Image, Title, ActionLink } from './styles';

interface ICardProps {
  thumbnail: string;
  name: string | null;
	id: number | null;
}

export default function SearchResultItem({thumbnail, name, id}: ICardProps) {
	const navigate = useNavigate();

	const handleClick = () => {
		if (id) navigate(`/hero/${id}`);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick();
		}
	};

	// Provide a cleaner fallback if thumbnail is missing or is the default "image_not_available"
	const imgSrc = thumbnail && !thumbnail.includes('image_not_available') 
		? thumbnail 
		: 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

	return (
		<Card 
			as='article' 
			onClick={handleClick}
			tabIndex={0}
			onKeyDown={handleKeyDown}
			aria-label={`View details for ${name || 'Unknown Character'}`}
		>
			<Image 
				src={imgSrc} 
				alt={name ? `Portrait of ${name}` : 'Character portrait'}
				loading='lazy'
			/>
			<Title>{name ? name : 'Unknown Entity'}</Title>
			<ActionLink as='span'>
				{id ? 'VIEW PROFILE' : 'DATA CORRUPTED'}
			</ActionLink>
		</Card>
	);
}
