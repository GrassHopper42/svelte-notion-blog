<script lang="ts">
    import type { PageServerData } from "./$types";
    import type {BlogPost} from "$lib/types";

    export let data: PageServerData;

    const { property, content }: BlogPost = data;
</script>

<svelte:head>
    <title>{property.title}</title>
</svelte:head>

{content}