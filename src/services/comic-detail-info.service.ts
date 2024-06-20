import { api } from '../services/api';
import { hash, publicKey, ts } from '../models/constants';
import { IComicsHeroInfoProps } from '../models/models';

export async function comicInfoDetailService(heroID: number): Promise<IComicsHeroInfoProps[]> {
	try {
		const { data } = await api.get(`v1/public/characters/${heroID}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
		const comicsInfo = data.data.results;
		return comicsInfo;
	} catch (error) {
		throw new Error(String(error));
	}
};