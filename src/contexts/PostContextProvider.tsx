import { createContext, FC, ReactNode } from "react"
import { PostInterface, PostsInterfaceWithLanguage } from "../interfaces/postsInterfaces"
import postsJson from '../../public/assets/jsons/posts.json'
import { useLanguage } from "./useLanguage"

// Cast the JSON import to the typed interface — TypeScript infers string literals as string otherwise
const posts = postsJson as PostsInterfaceWithLanguage

export interface PostContextType {
    posts: PostsInterfaceWithLanguage
    getPresentationPost: () => PostInterface[]
    getProjectPosts: () => PostInterface[]
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export const PostProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const {currentLanguage} = useLanguage()

    const getPresentationPost = () => {
        return posts[currentLanguage].presentation
    }
    const getProjectPosts = () => {
        return posts[currentLanguage].projects
    }

    return (
        <PostContext.Provider value={{getPresentationPost, getProjectPosts, posts}}>
            {children}
        </PostContext.Provider>
    )
}

export { PostContext }