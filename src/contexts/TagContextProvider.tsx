import { createContext, FC, ReactNode, useEffect, useState } from "react"
import { TagGroupedByCategory, TagInterface } from "../interfaces/postsInterfaces"
import { useLanguage } from "./useLanguage"

// Raw shape stored in tags.json
interface TagRawData {
    id: string
    text_en: string
    text_fr: string
    category: string
}

// Translated display names for each category slug
const categoryNames: Record<'en' | 'fr', Record<string, string>> = {
    en: {
        languages: "Languages",
        frontend: "Frontend",
        backend_data: "Backend & Data",
        devops_tools: "DevOps & Tools",
        project_type: "Project Type"
    },
    fr: {
        languages: "Langages",
        frontend: "Frontend",
        backend_data: "Backend & Data",
        devops_tools: "Outils & DevOps",
        project_type: "Type de projet"
    }
}

export interface TagsContextType {
    tags: TagInterface[]
    getTagById: (id: string) => TagInterface | undefined
    getTagsByIds: (ids:string[]) => TagInterface[]
    getTagsGroupedByCategory: (ids:string[]) => TagGroupedByCategory[]
}

const TagsContext = createContext<TagsContextType | undefined>(undefined)

export const TagsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { currentLanguage } = useLanguage()
    const [rawTags, setRawTags] = useState<TagRawData[] | null>(null)

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}assets/jsons/tags.json`)
            .then(res => res.json())
            .then((data: TagRawData[]) => setRawTags(data))
    }, [])

    if (!rawTags) return null

    // Map raw bilingual data to TagInterface for the current language
    const tags: TagInterface[] = rawTags.map(raw => ({
        id: raw.id,
        text: currentLanguage === 'fr' ? raw.text_fr : raw.text_en,
        category: categoryNames[currentLanguage][raw.category] ?? raw.category
    }))

    // return the tag that has the id given as parameter
    // if no match, return undefined
    const getTagById = (id:string) => {
        return tags.find(tag => tag.id === id)
    }

    // return the tags objects, from an array of tag id
    const getTagsByIds = (ids:string[]) => {
        return ids.map((id => getTagById(id))).filter((tag): tag is TagInterface => Boolean(tag)) // the filter here retain only the tag object (and filter out the case where getTagById return undefined)
    }

    // return the tags grouped into their categories
    const getTagsGroupedByCategory = (ids:string[]) => {
        const tagsObjects = getTagsByIds(ids)

        // checking whether the method groupBy exist in the browser context
        // (because groupBy is a ES2024 feature so it may not be compatible with all browsers)
        const hasGroupBy = typeof Object.groupBy === 'function'

        // return an object with the category as string and then an array of the tags that belong to this category
        // if the browser don't support groupBy, return another way to achieve the same result
        const groupedTags: Partial<Record<string, TagInterface[]>> = hasGroupBy
            ? Object.groupBy(tagsObjects, (tag) => tag.category)
            : tagsObjects.reduce((acc,t) => {
                (acc[t.category] ||= []).push(t)
                return acc
            },{} as Record<string,TagInterface[]>)

        return Object.keys(groupedTags)
            // .sort().reverse()
            // retrieve the tag object from groupedTags for each category
            .map(category => ({category, tags: groupedTags[category] ?? []}))
    }

    return (
        <TagsContext.Provider value={{tags,getTagById, getTagsByIds, getTagsGroupedByCategory}}>
            {children}
        </TagsContext.Provider>
    )
}

export { TagsContext }