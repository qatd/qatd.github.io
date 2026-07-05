// interface for tags grouped by category
export interface TagGroupedByCategory{
    category:string
    tags: TagInterface[]
}

// interface for the links of the project
export interface PostMediasInterface {
    id:number
    linkPath:string
    linkPathHd?:string
    text?:string
}

// interface for tag
export interface TagInterface{
    id:string
    text: string
    category:string
}

// interface for the link
export interface PostLinkInterface {
    linkName: string
    link:string
}

export interface PostKeyPointsInterface{
    id:number
    text:string
}

// interface for a single post item
export interface PostInterface {
    id: string
    projectOrigin?: string
    title?:string
    logo?:string
    description?:string
    tagsId?: string[]
    postTextParagraphs: string[]
    postTextKeyPoints?:{
        text:string
        points: PostKeyPointsInterface[]
    }
    postsLinks?:PostLinkInterface[]
    medias?: {
        images?:PostMediasInterface[]
        videos?:PostMediasInterface[]
    }
}

// the whole interface
export interface PostsInterface {
    presentation:PostInterface[]
    projects:PostInterface[]
}

export interface PostsInterfaceWithLanguage {
    en:PostsInterface
    fr:PostsInterface
}