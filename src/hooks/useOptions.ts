import axios from 'axios';
import { useEffect, useState } from 'react';

export interface UnsplashResult {
	urls: { small: string };
}
export interface UnsplashResponse {
	results: UnsplashResult[];
}
export const useOptions = (theme: string): string[] => {
	const [options, setOptions] = useState<UnsplashResult[]>([]);
	const [fetching, setFetching] = useState<boolean>(false);

	useEffect(() => {
		async function startFetching() {
			setFetching(true);
			const result = await axios.get(
				'https://api.unsplash.com//search/photos',
				{
					params: { query: theme, page: 1, per_page: 64 },
					headers: {
						Authorization:
							'Client-ID eUR9sNNGSjfDU5ACDh1iS2jMbL32FHT6QxAlmIUvtGQ',
					},
				}
			);

			setOptions(result.data.results);
			setFetching(false);
		}

		if (options.length === 0 && !fetching && theme !== '') {
			startFetching();
		}
	}, [fetching, options, theme]);

	return options.map((o) => o.urls.small);
};
