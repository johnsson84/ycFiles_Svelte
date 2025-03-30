<script>
	import { checkAuth } from '$lib/stores/checkAuth';
	import Dashboard from '$lib/dashboard/Dashboard.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import axios from 'axios';

	let isAuthenticated = $checkAuth.isAuthenticated;

	onMount(async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/auth/check/${localStorage.getItem('user')}`,
				{
					withCredentials: true
				}
			);
			
			checkAuth.set({
				isAuthenticated: true,
				user: response.data.username,
				roles: response.data.roles
			});
		} catch (error) {
			console.log('Auth check error: ' + error);
		}
	});
</script>

{#if !$checkAuth.isAuthenticated}
	<h1>Not authenticated...</h1>
	<p>Return to <a href="/">login</a></p>
{:else}
	<Dashboard />
{/if}
