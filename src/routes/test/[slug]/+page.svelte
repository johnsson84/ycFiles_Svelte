<script>
    import './test.css'

	/** @type {import('./$types').PageProps} */
	let { data } = $props();
    let count = $state(0);

    import { globalCount } from '$lib/stores';
    function increment() {
        globalCount.update((n) => n+1);
    }

</script>

<h1>{data.post.title}</h1>
<div>{data.post.content}</div>
<p class="test">{data.color.blue}</p>

<button onclick={() => count++}>Count: {count}</button>
<button onclick={increment}>Global count: {$globalCount}</button>