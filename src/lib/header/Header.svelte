<script>
	import './Header.css';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { checkAuth } from '$lib/stores/checkAuth';

	let user = $state(null);

	const logout = async () => {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/logout`,
				{},
				{
					withCredentials: true
				}
			);
			localStorage.clear();
			checkAuth.set({
				isAuthenticated: false,
				user: null,
				roles: []
			});
			goto('/');
		} catch (error) {
			console.log('Logout error: ' + error);
		}
	};

	onMount(() => {
		user = localStorage.getItem('user');
		if (user === null) {
			goto('/');
		}
	});
</script>

<div class="header">
	<div class="header-appname">
		<h1>ycFiles</h1>
		<h2>&nbsp;- your cloud files</h2>
	</div>
	<div class="header-user">
		<p>Logged in as: {user}</p>
		<button class="header-logout" onclick={logout}> Logout </button>
	</div>
</div>
