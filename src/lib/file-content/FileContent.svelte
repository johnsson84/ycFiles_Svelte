<script>
	import './FileContent.css';
	import axios from 'axios';
	import { selectedFolder, files } from '$lib/stores/files';
	import { onMount } from 'svelte';
	let file = $state(null);
	let fileToDelete = $state(null);

	const handleFileChange = (e) => {
		if (e.target.files) {
			file = e.target.files[0];
			console.log('Selected file:', file);
		}
	};

	const handleUploadClick = async () => {
		if (!file) {
			return;
		}

		const user = localStorage.getItem('user');

		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}/files/upload/${user}/${$selectedFolder}`,
				formData,
				{
					withCredentials: true
				}
			);
			file = null;
			getFiles($selectedFolder);
		} catch (error) {
			console.log(error);
		}
	};

	const getFiles = async (folderName) => {
		const user = localStorage.getItem('user');
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/files/getFiles/${user}/${folderName}`,
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			$files = res.data;
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	selectedFolder.subscribe((folderName) => {
		if (folderName) {
			getFiles(folderName);
		}
	});

	const deleteFile = async () => {
		const user = localStorage.getItem('user');

		const options = {
			method: 'DELETE', // Specify the HTTP method
			credentials: 'include', // Allow cookies to be sent with the request
			headers: {
				'Content-Type': 'application/json' // Set the content type to JSON
			}
		};

		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/files/delete/${user}/${$selectedFolder}/${fileToDelete}`,
				options
			);
			files.update((prev) => prev.filter((file) => file !== fileToDelete));
			fileToDelete = null;
		} catch (fetchError) {
			console.log(fetchError);
		}
	};
</script>

<div class="filecontent">
	<div class="fc-box">
		{#if $selectedFolder && $selectedFolder.length > 0}
			<div class="fc-header">
				<img src="/src/assets/folder.svg" width="20rem" />
				<h2 class="fc-name">{$selectedFolder}</h2>
				<div class="fc-addfiles">
					<button class={`fc-add ${file ? 'fc-add-show' : ''}`} onclick={handleUploadClick}
						>Add</button
					>
					<label class="fc-input-label" for="fc-input">Select File</label>
					<input id="fc-input" type="file" onchange={handleFileChange} />
				</div>
			</div>
		{/if}
		<div class="fc-content">
			{#if $files}
				{#each $files as file}
					<div class="fc-item-row">
						<div class="fc-item-row2">
							<img src="/src/assets/file.svg" alt="file-icon" width="30rem" />
							<div class="fc-item">
								{file}
							</div>
							<button type="image" class="fc-delete" onclick={() => fileToDelete = file}>
								<img src="/src/assets/trash.svg" height="30rem">
							</button>
						</div>
						{#if fileToDelete === file}
							<div class="fc-delFolder">
								<p>This will delete all files!</p>
								<div>
									<button class="fc-delFolder-buttons" onclick={() => deleteFile()}> Yes </button>
									<button class="fc-delFolder-buttons" onclick={() => (fileToDelete = null)}>
										No
									</button>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
