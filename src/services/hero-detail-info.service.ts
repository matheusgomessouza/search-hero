import { api } from '../services/api';
import { hash, publicKey, ts } from '../models/constants';
import { IHeroDetailProps } from '../models/models';

export async function getHeroDetailInfo(heroID: number): Promise<IHeroDetailProps[]> {  
	try {
		const { data } = await api.get(`/v1/public/characters/${heroID}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
		const heroDetailResponse = data.data.results;
		return heroDetailResponse;
	} catch (error) {
		throw new Error(String(error));
	} 
}