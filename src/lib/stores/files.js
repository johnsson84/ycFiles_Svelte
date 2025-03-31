import { writable } from 'svelte/store';

export const selectedFolder = writable("");

export const folders = writable([]);

export const files = writable([]);