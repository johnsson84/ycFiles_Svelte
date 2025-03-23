import axios from 'axios';
import { checkAuth } from '$lib/stores/checkAuth';
import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/check`,
          {
            withCredentials: true,
          }
        );
        if (!response.data.isAuthenticated) {
          throw redirect(302, '/');
        }
      } catch (error) {
        console.log("Catch error: " + error);
      }
}