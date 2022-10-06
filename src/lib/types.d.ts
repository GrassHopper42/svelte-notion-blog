interface Tag {
    color: string;
    id: string;
    name: string;
}

interface Category {
    color: string;
    id: string;
    name: string;
}

export interface PostProperty {
    id: string;
    createdAt: string;
    title: string;
    description: string;
    tags: Tag[];
    category: Category;
}

export interface BlogPost {
    property: PostProperty;
    content: string;
}