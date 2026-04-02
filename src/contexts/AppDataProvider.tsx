import { FC, ReactNode, useEffect, useState } from "react"
import { AppTextInterfacesWithLanguage, AppTextInterface } from "../interfaces/appTextInterfaces"
import { PostInterface, PostsInterfaceWithLanguage, TagGroupedByCategory, TagInterface } from "../interfaces/postsInterfaces"
import { LanguageContext } from "./LanguageContextProvider"
import { PostContext } from "./PostContextProvider"
import { TagsContext } from "./TagContextProvider"

// get the language of the browser to set the initial language state
const getBrowserLanguage = (): 'en' | 'fr' => {
    const browserLanguage = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage
    return browserLanguage?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

// Raw shape stored in tags.json
interface TagRawData {
    id: string
    text_en: string
    text_fr: string
    category: string
}

// Translated display names for each category slug (moved from TagContextProvider)
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

interface AllData {
    appText: AppTextInterfacesWithLanguage
    posts: PostsInterfaceWithLanguage
    rawTags: TagRawData[]
}

// Single provider that fetches all 3 JSON files in parallel,
// then provides LanguageContext, PostContext, and TagsContext at once.
export const AppDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [allData, setAllData] = useState<AllData | null>(null)
    const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr'>(getBrowserLanguage())

    useEffect(() => {
        const base = import.meta.env.BASE_URL
        Promise.all([
            fetch(`${base}assets/jsons/appText.json`).then(r => r.json()),
            fetch(`${base}assets/jsons/posts.json`).then(r => r.json()),
            fetch(`${base}assets/jsons/tags.json`).then(r => r.json()),
        ]).then(([appText, posts, rawTags]: [AppTextInterfacesWithLanguage, PostsInterfaceWithLanguage, TagRawData[]]) => {
            setAllData({ appText, posts, rawTags })
        })
    }, [])

    // Block rendering until all 3 fetches complete (same UX as before, but only one wait)
    if (!allData) return null

    const { appText: appTextData, posts, rawTags } = allData
    const appText: AppTextInterface = appTextData[currentLanguage]

    // --- Language context values ---
    const setLanguage = (language: 'en' | 'fr') => setCurrentLanguage(language)

    // --- Post context values ---
    const getPresentationPost = (): PostInterface[] => posts[currentLanguage].presentation
    const getProjectPosts = (): PostInterface[] => posts[currentLanguage].projects

    // --- Tags context values ---
    const tags: TagInterface[] = rawTags.map(raw => ({
        id: raw.id,
        text: currentLanguage === 'fr' ? raw.text_fr : raw.text_en,
        category: categoryNames[currentLanguage][raw.category] ?? raw.category
    }))

    const getTagById = (id: string) => tags.find(tag => tag.id === id)

    const getTagsByIds = (ids: string[]) =>
        ids.map(id => getTagById(id)).filter((tag): tag is TagInterface => Boolean(tag))

    const getTagsGroupedByCategory = (ids: string[]): TagGroupedByCategory[] => {
        const tagsObjects = getTagsByIds(ids)

        const hasGroupBy = typeof Object.groupBy === 'function'
        const groupedTags: Partial<Record<string, TagInterface[]>> = hasGroupBy
            ? Object.groupBy(tagsObjects, (tag) => tag.category)
            : tagsObjects.reduce((acc, t) => {
                (acc[t.category] ||= []).push(t)
                return acc
            }, {} as Record<string, TagInterface[]>)

        return Object.keys(groupedTags)
            .map(category => ({ category, tags: groupedTags[category] ?? [] }))
    }

    return (
        <LanguageContext.Provider value={{ currentLanguage, setLanguage, appText }}>
            <PostContext.Provider value={{ posts, getPresentationPost, getProjectPosts }}>
                <TagsContext.Provider value={{ tags, getTagById, getTagsByIds, getTagsGroupedByCategory }}>
                    {children}
                </TagsContext.Provider>
            </PostContext.Provider>
        </LanguageContext.Provider>
    )
}
