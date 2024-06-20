import { api } from './api';
import { IHeroProps } from '../models/models';
import { hash, publicKey, ts } from '../models/constants';

export async function getHeroLabelService(typedWord: string): Promise<IHeroProps[]> {
	try { 
		const responseHeroData = await api.get(`/v1/public/characters?name=${typedWord}&ts=${ts}&apikey=${publicKey}&hash=${hash}`);
	
		const heroReturned = responseHeroData.data.data.results;
		const result: IHeroProps[] = heroReturned.map((element: IHeroProps) => ({
			id: element.id,
			name: element.name,
			description: element.description,
			thumbnail: { path: element?.thumbnail?.path + '.jpg' }
		}));
		return result;
	} catch (error: any) {	
		throw new Error(error);
	}
};