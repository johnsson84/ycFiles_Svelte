<script>
	import './Sidebar.css';
	import { folders } from '$lib/stores/files';
	import { selectedFolder } from '$lib/stores/files';
	import { onMount } from 'svelte';

	let showFolderBox = $state(false);
	let newFolder = $state('');
	let folderToDelete = $state('');
	const selectFolder = (e) => {
		selectedFolder.set(e);
		console.log($selectedFolder);
	};

	const getFolder = async () => {
		const user = localStorage.getItem('user');

		const options = {
			method: 'GET', // Specify the HTTP method
			headers: {
				'Content-Type': 'application/json' // Set the content type to JSON
			},
			credentials: 'include' // Allow cookies to be sent with the request
		};

		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/files/getFolders/${user}`, options);
			const data = await res.json();
			console.log(data);
			if (Array.isArray(data)) {
				folders.update((prev) => [
					...prev,
					...data
						.filter((folderName) => !prev.some((folder) => folder.name === folderName))
						.map((folderName) => ({ name: folderName }))
				]);
			}
		} catch (fetchError) {
			console.log(fetchError);
		}
	};

	const addFolder = async () => {
		const user = localStorage.getItem('user');

		const options = {
			method: 'POST', // Specify the HTTP method
			credentials: 'include', // Allow cookies to be sent with the request
			headers: {
				'Content-Type': 'application/json' // Set the content type to JSON
			}
		};

		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/files/addFolder/${user}/${newFolder}`,
				options
			);
			getFolder();
			showFolderBox = false;
			newFolder = '';
		} catch (fetchError) {
			console.log(fetchError);
		}
	};

	const deleteFolder = async () => {
        const user = localStorage.getItem("user");
        
        const options = {
            method: "DELETE", // Specify the HTTP method
            credentials: "include", // Allow cookies to be sent with the request
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
        };

        try {
          
            const res = await fetch(`${import.meta.env.VITE_API_URL}/files/delete/${user}/${folderToDelete}`,
                options
            );
            folders.update((prev) => prev.filter((folder) => folder.name !== folderToDelete));
            folderToDelete = "";
            $selectedFolder = "";
        } catch (fetchError) {
            console.log(fetchError);
        }
    };

	onMount(async () => {
		await getFolder();
		selectedFolder.subscribe(($selectedFolder) => {
			folders.subscribe(($folders) => {
				if ($folders && $folders.length > 0 && $selectedFolder === '') {
					selectedFolder.set($folders[0].name);
				}
			});
		});
	});
</script>

<div class="sidebar">
	<nav class="sb-nav">
		<h2 class="sb-folder-name">
			Folders{' '}
			<button class="sb-folder-button" onclick={() => (showFolderBox = true)}> + </button>
		</h2>
		{#if showFolderBox}
			<div class={`sb-folderbox ${showFolderBox ? 'sb-show-folderbox' : ''}`}>
				<input
					class="sb-folderbox-input"
					placeholder="Folder name"
					value={newFolder}
					onchange={(e) => (newFolder = e.target.value)}
				/>
				<button id="sb-folderbtn-1" class="sb-folderbox-buttons" onclick={() => addFolder()}>
					Add
				</button>
				<button
					id="sb-folderbtn-2"
					class="sb-folderbox-buttons"
					onclick={() => (showFolderBox = false)}
				>
					&#8673;
				</button>
			</div>
		{/if}
		<ul class="sb-list">
			{#if $folders}
				{#each $folders as folder}
					<div class="sb-list-section">
						<div class="sb-list-section2">
							<li
								class={`sb-folder ${$selectedFolder === folder.name ? 'sb-selected' : ''}`}
								onclick={(e) => selectFolder(folder.name)}
							>
								{folder.name}
							</li>
							<button class="sb-delete" onclick={() => folderToDelete = folder.name}
								><img src="/src/assets/trash.svg" width="20rem" /></button
							>
						</div>
						{#if folderToDelete === folder.name}
							<div class="sb-delFolder">
								<p>This will delete all files!</p>
								<div>
									<button class="sb-delFolder-buttons" onclick={() => deleteFolder()}>Yes</button>
									<button class="sb-delFolder-buttons" onclick={() => folderToDelete = ''}
										>No</button
									>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		</ul>
	</nav>
</div>
