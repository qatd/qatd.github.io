import { createContext, FC, ReactNode, useEffect, useState } from "react"
import { PostInterface, PostsInterfaceWithLanguage } from "../interfaces/postsInterfaces"
import { useLanguage } from "./useLanguage"

export interface PostContextType {
    posts: PostsInterfaceWithLanguage
    getPresentationPost: () => PostInterface[]
    getProjectPosts: () => PostInterface[]
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export const PostProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { currentLanguage } = useLanguage()
    const [posts, setPosts] = useState<PostsInterfaceWithLanguage | null>(null)

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}assets/jsons/posts.json`)
            .then(res => res.json())
            .then((data: PostsInterfaceWithLanguage) => setPosts(data))
    }, [])

    if (!posts) return null

    const getPresentationPost = () => posts[currentLanguage].presentation
    const getProjectPosts = () => posts[currentLanguage].projects

    return (
        <PostContext.Provider value={{getPresentationPost, getProjectPosts, posts}}>
            {children}
        </PostContext.Provider>
    )
}

export { PostContext }