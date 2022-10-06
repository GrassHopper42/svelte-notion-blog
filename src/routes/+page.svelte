<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

{#each data.posts as post}
    <a href={`/${post.id}`}>{post.title}</a>
{/each}