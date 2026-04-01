import { createContext, FC, ReactNode, useEffect, useState } from "react"
import { AppTextInterface, AppTextInterfacesWithLanguage } from "../interfaces/appTextInterfaces"

export interface LanguageContextType {
    currentLanguage: 'en' | 'fr'
    setLanguage: (language: 'en' | 'fr') => void
    appText: AppTextInterface
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// get the language of the browser
// can be used to set the default language of the app via currentLanguage state
const getBrowserLanguage = (): 'en' | 'fr' => {
    const browserLanguage = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage
    return browserLanguage?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr'>(getBrowserLanguage())
    const [appTextData, setAppTextData] = useState<AppTextInterfacesWithLanguage | null>(null)

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}assets/jsons/appText.json`)
            .then(res => res.json())
            .then((data: AppTextInterfacesWithLanguage) => setAppTextData(data))
    }, [])

    const setLanguage = (language: 'en' | 'fr') => setCurrentLanguage(language)

    if (!appTextData) return null

    const currentAppText = appTextData[currentLanguage]

    return (
        <LanguageContext.Provider value={{ currentLanguage, setLanguage, appText: currentAppText }}>
            {children}
        </LanguageContext.Provider>
    )
}

export { LanguageContext }