import { Card, DisabledCard, Image, Title, ActionLink } from './styles';

interface ICardProps {
	thumbnail: string;
	name: string | null;
	id: number | null;
}

export default function SearchResultItem({thumbnail, name, id}: ICardProps) {
	// Provide a cleaner fallback if thumbnail is missing, malformed, or is the default "image_not_available"
	const thumbnailValue = thumbnail?.trim() || '';
	const isInvalidThumbnail =
		!thumbnailValue ||
		thumbnailValue.includes('image_not_available') ||
		/^(undefined|null)(\.[a-z0-9]+)?$/i.test(thumbnailValue);
		
	const imgSrc = isInvalidThumbnail
		? 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
		: thumbnailValue;

	if (id == null) {
		return (
			<DisabledCard aria-label={`Details unavailable for ${name || 'Unknown Character'}`}>
				<Image 
					src={imgSrc} 
					alt={name ? `Portrait of ${name}` : 'Character portrait'}
					loading='lazy'
				/>
				<Title>{name ? name : 'Unknown Entity'}</Title>
				<ActionLink as='span' style={{ opacity: 1, color: 'var(--variant-font-color)', transform: 'none' }}>
					DATA CORRUPTED
				</ActionLink>
			</DisabledCard>
		);
	}

	return (
		<Card 
			to={`/hero/${id}`}
			aria-label={`View details for ${name || 'Unknown Character'}`}
		>
			<Image 
				src={imgSrc} 
				alt={name ? `Portrait of ${name}` : 'Character portrait'}
				loading='lazy'
			/>
			<Title>{name ? name : 'Unknown Entity'}</Title>
			<ActionLink as='span'>
				VIEW PROFILE
			</ActionLink>
		</Card>
	);
}
