import fetchRefresh from '$lib/helpers/fetch-refresh';
import { error, type NumericRange } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const albumRes = await fetchRefresh(fetch, `/api/spotify/albums/${params.id}`);

	if (!albumRes.ok) {
		error(albumRes.status as NumericRange<400, 599>, 'Failed to load album');
	}

	const albumJSON: SpotifyApi.SingleAlbumResponse = await albumRes.json();

	return {
		album: albumJSON,
		title: albumJSON.name
	};
};
