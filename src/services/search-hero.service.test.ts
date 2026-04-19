import { getHeroLabelService } from './search-hero.service';
import { api } from './api';
import { hash, publicKey, ts } from '../models/constants';

jest.mock('./api', () => ({
	api: {
		get: jest.fn(),
	},
}));

describe('search-hero.service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should call the API with the correct encoded URL and credentials', async () => {
		(api.get as jest.Mock).mockResolvedValue({ data: { data: { results: [] } } });

		await getHeroLabelService('Spider-Man');

		const expectedUrl = `/v1/public/characters?name=Spider-Man&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
		expect(api.get).toHaveBeenCalledWith(expectedUrl);
	});

	it('should correctly map the Marvel API response to IHeroProps', async () => {
		const mockMarvelResponse = {
			data: {
				data: {
					results: [
						{
							id: 1009610,
							name: 'Spider-Man',
							description: 'Bitten by a radioactive spider.',
							thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b' },
							comics: { available: 12 },
						},
					],
				},
			},
		};

		(api.get as jest.Mock).mockResolvedValue(mockMarvelResponse);

		const result = await getHeroLabelService('Spider-Man');

		expect(result).toEqual([
			{
				id: 1009610,
				name: 'Spider-Man',
				description: 'Bitten by a radioactive spider.',
				thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg' },
			},
		]);
	});

	it('should handle elements without a thumbnail safely', async () => {
		const mockMarvelResponse = {
			data: {
				data: {
					results: [
						{
							id: 9999,
							name: 'Invisible Boy',
							description: 'No thumbnail available.',
							// deliberately missing thumbnail object
						},
						{
							id: 8888,
							name: 'No Path Girl',
							description: 'Thumbnail object exists but no path.',
							thumbnail: {},
						},
						{
							id: 7777,
							name: 'Null thumbnail',
							thumbnail: null,
						}
					],
				},
			},
		};

		(api.get as jest.Mock).mockResolvedValue(mockMarvelResponse);

		const result = await getHeroLabelService('Invisible Boy');

		expect(result).toEqual([
			{
				id: 9999,
				name: 'Invisible Boy',
				description: 'No thumbnail available.',
				thumbnail: { path: 'undefined.jpg' },
			},
			{
				id: 8888,
				name: 'No Path Girl',
				description: 'Thumbnail object exists but no path.',
				thumbnail: { path: 'undefined.jpg' },
			},
			{
				id: 7777,
				name: 'Null thumbnail',
				description: undefined,
				thumbnail: { path: 'undefined.jpg' },
			}
		]);
	});

	it('should throw an error if the API call fails', async () => {
		const networkError = new Error('Network Error');
		(api.get as jest.Mock).mockRejectedValue(networkError);

		await expect(getHeroLabelService('Spider-Man')).rejects.toThrow('Network Error');
	});
});
