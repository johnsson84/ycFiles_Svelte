<script>
	import './Sidebar.css';
	import { folders } from '$lib/stores/files';
	import { selectedFolder } from '$lib/stores/files';

	const selectFolder = (e) => {
		selectedFolder.set(e);
        console.log($selectedFolder);
	};
</script>

<div class="sidebar">
	<nav class="sb-nav">
		<h2 class="sb-name">Folders</h2>
		<ul class="sb-list">
			{#if $folders}
				{#each $folders as folder}
					<li
						class={`sb-folder ${$selectedFolder === folder.name ? 'sb-selected' : ''}`}
						onclick={(e) => selectFolder(folder.name)}
					>
						{folder.name}
                    </li>
				{/each}
			{/if}
		</ul>
	</nav>
</div>
