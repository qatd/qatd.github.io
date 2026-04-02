import { createContext } from "react"
import { AppTextInterface } from "../interfaces/appTextInterfaces"

export interface LanguageContextType {
    currentLanguage: 'en' | 'fr'
    setLanguage: (language: 'en' | 'fr') => void
    appText: AppTextInterface
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export { LanguageContext }
