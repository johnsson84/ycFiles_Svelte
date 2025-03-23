<script>
	import { checkAuth } from '$lib/stores/checkAuth';
	import Dashboard from '$lib/dashboard/Dashboard.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let isAuthenticated = $checkAuth.isAuthenticated;
    console.log($checkAuth);
</script>

{#if !$checkAuth.isAuthenticated}
	<h1>Not authenticated...</h1>
    <p>Return to <a href="/">login</a></p>
{:else}
	<Dashboard />
{/if}
