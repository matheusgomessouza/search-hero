import { MD5 } from 'crypto-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../../services/api';

import Footer from '../../../components/Footer';
import { 
	Button, 
	Image, 
	Name, 
	Description, 
	Container, 
	Title
} from './styles';
import { BsBoxArrowLeft } from 'react-icons/bs';

import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ICharacterProps {
	id: number;
	name: string;
	thumbnail: { path: string };
	description: string;
	urls?:  {
    type?: string;
    url: string;
  }[];
	title?: string;
}

type IComicProps = Omit<ICharacterProps,'name' | 'description'>; 

export function HeroInfo() {

	// Security Treatement and calling API Marvel
	const ts = new Date().getTime();
	const privateKey = process.env.REACT_APP_PRIVATE_KEY as string;
	const publicKey = process.env.REACT_APP_PUBLIC_KEY as string;
	const mixed = ts + privateKey + publicKey;
	const hash = MD5(mixed).toString();
	const navigate = useNavigate();

	const [heroInformation, setHeroInformation] = useState<ICharacterProps[]>([] as ICharacterProps[]);
	const [comics, setComics] = useState<IComicProps[]>([] as IComicProps[]);

	useEffect(() => {
		const URL =  String(window.location.pathname);
		const heroID = Number(URL.replace(/(\D)/g, ''));
		
		(async () => {		
			await api.get(`/v1/public/characters/${heroID}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
				.then(function (response) {
					const heroInfo = response.data.data.results;
					heroInfo.forEach((element: ICharacterProps) => {
						setHeroInformation([{
							id: element.id,
							name: element.name,
							thumbnail: { path: element.thumbnail.path + '.jpg' },
							description: element.description,
						}]);
					});
				})
				.catch(function (error) {
					console.log(error, 'Nothing could be found');
				});

			await api.get(`/v1/public/characters/${heroID}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
				.then(function (response) {
					const heroComics = response.data.data.results;
					setComics(heroComics);
				})
				.catch(function (error) {
					console.log(error);
				});
		})();
	}, [hash, publicKey, ts]);

	return (
		<>
			<Container>
				<Button onClick={() => { navigate('/'); }}>
					<BsBoxArrowLeft />{''}
					Search a Hero
				</Button>

				{heroInformation.map(info => (
					<div style={{ paddingTop: '10%' }} key={info.id}>
						<Image src={info.thumbnail.path} alt='' />
						<Name>{info.name}</Name>
						{info.description ? (
							<Description>
								{info.description}
							</Description>
						) : (
							<Description>
								We couldn&apos;t find any description on the database about 
								this particular hero, villain, group or whatever that 
								you&apos;re trying to search about.
							</Description>
						)}

						<Swiper
							modules={[Navigation, Autoplay, Pagination]}
							centeredSlides
							slidesPerView='auto'
							autoplay={{
								delay: 5000,
							}}
						>
							{comics.map((comic: IComicProps) => {
								return (		
									<SwiperSlide key={comic.id}>
										<Image 
											src={comic.thumbnail.path + '.jpg'} 
											width='200px' 
											height='290px'
										/>
										<Title>
											{comic.title}
										</Title>
										<div className='purchase-button'>
											<a 
												target='_blank'
												rel='noreferrer'
												href={comic?.urls?.[0]?.url ?? comic?.urls?.[1]?.url} 
											>
												{comic?.urls?.[0]?.url ? 'DETAILS' : 'BUY'}
											</a>
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				))}
			</Container>
			<Footer/>
		</>
	);
}

