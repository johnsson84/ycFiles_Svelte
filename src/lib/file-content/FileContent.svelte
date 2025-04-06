<script>
	import './FileContent.css';
	import axios from 'axios';
	import { selectedFolder, files } from '$lib/stores/files';
	import { onMount } from 'svelte';
	let file = $state(null);
	let fileToDelete = $state(null);
	let user = $state(localStorage.getItem('user'));

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

	const downloadFile = async (file) => {
        console.log(file);
        const options = {
            method: "GET",
            credentials: "include",
        };

        try {
            const res = await fetch(
                `${
                    import.meta.env.VITE_API_URL
                }/files/download/${user}/${$selectedFolder}/${file}`,
                options
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            // Convert to blob
            const blob = await res.blob();

            // URL for blob
            const url = window.URL.createObjectURL(blob);

            // Create an anchor element and set its attributes
            const a = document.createElement("a");
            a.href = url;
            a.download = file; // Set the filename to download

            // Append the anchor element to the body
            document.body.appendChild(a);

            // Programmatically click the anchor
            a.click();

            // Clean up: revoke the URL and remove the anchor element
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
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
							<button type="image" class="fc-download" onclick={() => downloadFile(file)}>
								<img src="/src/assets/download.svg" height="30rem">
							</button>
							<button type="image" class="fc-delete" onclick={() => (fileToDelete = file)}>
								<img src="/src/assets/trash.svg" height="30rem" />
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
