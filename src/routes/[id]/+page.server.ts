import type {PageServerLoad} from "./$types";
import {getContent} from "../../lib/notion";

export const load: PageServerLoad = async ({params}) => {
    return await getContent(params.id);
}