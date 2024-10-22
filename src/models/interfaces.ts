export interface IHeroProps {
	id: number;
	name: string;
	description: string;
	thumbnail: { path: string };
}

export interface IHeroDetailProps {
	id: number;
	name: string;
	thumbnail: { path: string };
	description: string;
	comics?: IComicsHeroInfoProps[];
}

export interface IComicsHeroInfoProps {
	id: number;
	thumbnail: { path: string };
	title: string;
	urls: {
		type: string;
		url: string;
	}[];
}

