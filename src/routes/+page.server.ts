import type { PageServerLoad } from './$types';
import { fetchPublishedPosts } from "../lib/notion";

export const load: PageServerLoad = async () => {
    const posts = await fetchPublishedPosts();
    return { posts }
}