import type { PageLoad } from './$types';
import fetchRefresh from '$lib/helpers/fetch-refresh';
import { error, type NumericRange } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch: _fetch, params }) => {
	const fetch = (path: string) => fetchRefresh(_fetch, path);

	const playlistRes = await fetch(`/api/spotify/playlists/${params.id}`);

	if (!playlistRes.ok) {
		error(playlistRes.status as NumericRange<400, 599>, 'Failed to load playlist');
	}

	const playlistResJSON: SpotifyApi.SinglePlaylistResponse = await playlistRes.json();

	let color = null;
	if (playlistResJSON.images.length > 0) {
		const colorRes = await fetch(
			`/api/average-color?${new URLSearchParams({
				image: playlistResJSON.images[0].url
			}).toString()}`
		);

		if (colorRes.ok) {
			color = (await colorRes.json()).color;
		}
	}

	return {
		playlist: playlistResJSON,
		color,
		title: playlistResJSON.name
	};
};
