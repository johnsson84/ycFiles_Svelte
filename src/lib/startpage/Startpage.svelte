<script>
	import './sp-style.css';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	let loginEnabled = $state(false);
	let registerEnabled = $state(false);

	// LOGIN
    ///////////////////////////////////////////////////
	let loginFields = $state({
		email: '',
		password: ''
	});

	const switchToLoginForm = () => {
		loginEnabled = !loginEnabled;
	};

	const handleLoginFieldChange = (e) => {
		loginFields = { ...loginFields, [e.target.name]: e.target.value };
	};

	const login = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, loginFields, {
				withCredentials: true
			});
			localStorage.setItem('user', response.data.username);
			console.log(response.data);
			goto('/dashboard');
		} catch (err) {
			console.log('Catch: ' + err);
		}
	};

	// REGISTER
    //////////////////////////////////////////////////////////////////
	const switchToRegisterForm = () => {
		registerEnabled = !registerEnabled;
	};

    let registerFields = $state({
        email: "",
        password: ""
    });

    const handleRegisterFieldChange = (e) => {
        registerFields = {...registerFields, [e.target.name]: e.target.value}
    }

    const register = async (e) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        registerFields,
        {
          withCredentials: true,
        });
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.log("Catch: " + err);
    }
  }

</script>

<div class="startpage">
	<div class="sp-logo">
		<h1>ycFiles</h1>
		<p>your cloud files.</p>
	</div>
	{#if !loginEnabled && !registerEnabled}
		<button class="spform-button" type="button" onclick={() => switchToLoginForm()}>Login</button>
		<p class="sp-register-link">
			Don't have an account? Register <a href="#" onclick={() => switchToRegisterForm()}
				>here.</a
			>
		</p>
	{/if}
	{#if loginEnabled && !registerEnabled}
		<form class="spform">
			<label for="email">Email:</label><br />
			<input
				class="spform-input"
				type="email"
				name="email"
				bind:value={loginFields.email}
				oninput={(e) => handleLoginFieldChange(e)}
				placeholder="enter your email..."
			/><br />
			<label for="password">Password:</label><br />
			<input
				class="spform-input"
				type="password"
				name="password"
				bind:value={loginFields.password}
				oninput={(e) => handleLoginFieldChange(e)}
				placeholder="enter your password..."
			/><br />
			<button class="spform-button" onclick={(e) => login(e)}>Login</button>
		</form>
	{/if}
	{#if !loginEnabled && registerEnabled}
		<form class="spform">
			<label for="email">Email:</label><br />
			<input
				class="spform-input"
				type="email"
				name="email"
				bind:value={registerFields.email}
				oninput={(e) => handleRegisterFieldChange(e)}
				placeholder="enter your email..."
			/><br />
			<label for="password">Password:</label><br />
			<input
				class="spform-input"
				type="password"
				name="password"
				bind:value={registerFields.password}
				oninput={(e) => handleRegisterFieldChange(e)}
				placeholder="enter your password..."
			/><br />
			<button class="spform-button" onclick={(e) => register(e)}>Register</button>
		</form>
	{/if}
    <p class="sp-build">Built with: Svelte</p>
</div>
