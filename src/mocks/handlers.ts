import { http, HttpResponse } from 'msw';

export const handlers = [
	http.get('https://gateway.marvel.com/v1/public/characters', ({ request }) => {
		const url = new URL(request.url);
		const name = url.searchParams.get('name');

		if (name === 'Wolverine') {
			return HttpResponse.json({
				data: {
					results: [
						{
							id: 1,
							name: 'Wolverine',
							thumbnail: { path: 'http://example.com/wolverine', extension: 'jpg' },
							description: 'Mutant with adamantium claws',
						},
					],
				},
			});
		}

		if (name === 'NonExistentHero123') {
			return HttpResponse.json({
				data: {
					results: [],
				},
			});
		}

		return HttpResponse.json({ data: { results: [] } });
	}),
];
