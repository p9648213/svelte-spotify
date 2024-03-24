<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Button from './Button.svelte';
</script>

<form
	method="post"
	action="/api/auth/logout"
	on:submit|preventDefault={async () => {
		const response = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
				accept: 'application/json'
			}
		});

		if (response.ok) {
			invalidateAll();
		}
	}}
>
	<Button element="button" type="submit">Logout</Button>
</form>
