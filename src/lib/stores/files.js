import { writable } from 'svelte/store';

export const selectedFolder = writable("Upload");

export const folders = writable([
    {name: 'Upload'},
    {name: 'Crap'}
])