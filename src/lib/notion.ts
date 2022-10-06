import { Client } from "@notionhq/client";
import { NOTION_API_KEY, NOTION_DATABASE_ID } from '$env/static/private';
import { NotionToMarkdown } from "notion-to-md";
import type {BlogPost, PostProperty} from "./types";

const notion = new Client({auth: NOTION_API_KEY});
const n2m = new NotionToMarkdown({notionClient: notion});

export const fetchPublishedPosts = async (): Promise<PostProperty[]> => {
    const { results } = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        filter: {
            property: 'Published',
            checkbox: {
                equals: true
            }
        },
        sorts: [
            {
                timestamp: 'created_time',
                direction: 'descending'
            },
        ]
    })
    return results.map(result => convertDataToPostProperty(result));
}

export const fetchByCategory = async (category: string) => {
    const { results } = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        filter: {
            and: [
                {
                    property: 'Published',
                    checkbox: {
                        equals: true
                    }
                },
                {
                    property: 'Category',
                    select: {
                        equals: category
                    }
                }
            ]
        },
        sorts: [
            {
                timestamp: 'created_time',
                direction: 'descending'
            },
        ]
    })
    return results.map(result => convertDataToPostProperty(result));
}

export const getContent = async (pageId: string): Promise<BlogPost> => {
    const data = await notion.pages.retrieve({
        page_id: pageId
    })
    const property = convertDataToPostProperty(data);
    const page = await n2m.pageToMarkdown(pageId);
    const content = n2m.toMarkdownString(page);

    return {
        property,
        content
    }
}

const convertDataToPostProperty = (data: any): PostProperty => {
    const createdDate = new Date(data.created_time);
    return {
        id: data.id,
        createdAt: createdDate.toLocaleString('ko'),
        title: data.properties.Title.title[0].plain_text,
        description: data.properties.Description.rich_text[0]?.plain_text,
        category: data.properties.Category.select,
        tags: data.properties.Tags.multi_select
    };
};
