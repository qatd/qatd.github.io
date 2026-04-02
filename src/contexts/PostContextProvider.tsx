import { createContext } from "react"
import { PostInterface, PostsInterfaceWithLanguage } from "../interfaces/postsInterfaces"

export interface PostContextType {
    posts: PostsInterfaceWithLanguage
    getPresentationPost: () => PostInterface[]
    getProjectPosts: () => PostInterface[]
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export { PostContext }
