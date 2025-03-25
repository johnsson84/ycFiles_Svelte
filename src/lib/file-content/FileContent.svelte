<script>
	import './FileContent.css';
	import axios from 'axios';
	import { selectedFolder } from '$lib/stores/files';
	let file = $state(null);
	let files = $state([]);

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
			files = res.data;
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
</script>

<div class="filecontent">
	<div class="fc-box">
		<div class="fc-header">
			<h2 class="fc-name">{$selectedFolder}:</h2>
			<div class="fc-addfiles">
				<button class={`fc-add ${file ? 'fc-add-show' : ''}`} onclick={handleUploadClick}
					>Add</button
				>
				<label class="fc-input-label" for="fc-input">Select File</label>
				<input id="fc-input" type="file" onchange={handleFileChange} />
			</div>
		</div>
		<div class="fc-content">
			{#if files}
				{#each files as file}
					<div class="fc-item">
						{file}
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
