<script>
	import './Dashboard.css';
	import Header from '$lib/header/Header.svelte';
</script>

<div class="dashboard">
	<header class="db-header db-general">
        <Header />
    </header>
    <section class="db-section">
        <div class="db-sidebar db-general">
            <p>Sidebar</p>
        </div>
        <div class="db-content db-general">
            <p>Content</p>
        </div>
    </section>
</div>