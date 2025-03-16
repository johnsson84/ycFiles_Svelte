<script>
	import './Header.css';
	import { goto } from '$app/navigation';
	import axios from 'axios';

	const logout = async () => {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/logout`,
				{},
				{
					withCredentials: true
				}
			);
			localStorage.setItem('user', null);
			goto('/');
		} catch (error) {
			console.log('Logout error: ' + error);
		}
	};
</script>

<div class="header">
	<div class="header-appname">
		<h1>ycFiles</h1>
		<h2>&nbsp;- your cloud files</h2>
	</div>
	<div class="header-user">
		<p>Logged in as: {localStorage.getItem('user')}</p>
		<button class="header-logout" onclick={logout}> Logout </button>
	</div>
</div>
