<script>
	import './Dashboard.css';
	import Header from '$lib/header/Header.svelte';
    import Sidebar from '$lib/sidebar/Sidebar.svelte';
    import FileContent from '$lib/file-content/FileContent.svelte';
</script>

<div class="dashboard">
	<header class="db-header db-general">
        <Header />
    </header>
    <section class="db-section">
        <div class="db-sidebar db-general">
            <Sidebar />
        </div>
        <div class="db-content db-general">
            <FileContent />
        </div>
    </section>
</div>