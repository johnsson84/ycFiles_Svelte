import { writable } from 'svelte/store';

const getInitialState = () => {
	if (typeof window !== 'undefined' && window.localStorage) {
		return (
			JSON.parse(localStorage.getItem('auth')) || {
				isAuthenticated: false,
				user: null,
				roles: []
			}
		);
	}

	return {
		isAuthenticated: false,
		user: null,
		roles: []
	};
};

export const checkAuth = writable(getInitialState());
