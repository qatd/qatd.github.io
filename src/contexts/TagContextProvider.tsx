import { createContext } from "react"
import { TagGroupedByCategory, TagInterface } from "../interfaces/postsInterfaces"

export interface TagsContextType {
    tags: TagInterface[]
    getTagById: (id: string) => TagInterface | undefined
    getTagsByIds: (ids:string[]) => TagInterface[]
    getTagsGroupedByCategory: (ids:string[]) => TagGroupedByCategory[]
}

const TagsContext = createContext<TagsContextType | undefined>(undefined)

export { TagsContext }
