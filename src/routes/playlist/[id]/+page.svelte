<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ItemPage from '$lib/components/ItemPage.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: color = data.color;
	$: playlist = data.playlist;
	$: tracks = data.playlist.tracks;

	let filteredTracks: SpotifyApi.TrackObjectFull[];

	$: {
		filteredTracks = [];
		tracks.items.forEach((item) => {
			if (item.track) {
				filteredTracks = [...filteredTracks, item.track];
			}
		});
	}

	const followersFormat = Intl.NumberFormat('ev', { notation: 'compact' });
</script>

<ItemPage
	title={playlist.name}
	image={playlist.images.length > 0 ? playlist.images[0].url : undefined}
	{color}
	type={playlist.type}
>
	<div slot="meta">
		<p class="playlist-description">{@html playlist.description}</p>
		<p class="meta">
			<span>{playlist.owner.display_name}</span>
			<span>{followersFormat.format(playlist.followers.total)}</span>
			<span>{playlist.tracks.total}</span>
		</p>
	</div>

	{#if playlist.tracks.items.length > 0}
		<TrackList tracks={filteredTracks} />
	{:else}
		<div class="empty-playlist">
			<p>No items added to this playlist yet.</p>
			<Button element="a" href="/search">Search for Content</Button>
			<Button element="a" href="/playlists">View all Playlists</Button>
		</div>
	{/if}
</ItemPage>

<style lang="scss">
	.empty-playlist {
		text-align: center;
		margin-top: 40px;
		p {
			font-size: functions.toRem(22);
			font-weight: 600;
		}
		:global(a) {
			margin: 0 10px;
		}
	}
</style>
