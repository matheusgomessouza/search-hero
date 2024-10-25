export interface IHeroProps {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
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

export interface ICardProps {
  thumbnail: {
    extension: string;
    path: string;
  };
  name: string | null;
  id: number | null;
}
