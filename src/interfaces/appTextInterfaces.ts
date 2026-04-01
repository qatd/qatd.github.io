import { RouteId } from '../routes/routeConfig'

// export the whole interfaces above, starting with a language
export interface AppTextInterfacesWithLanguage {
    fr: AppTextInterface
    en: AppTextInterface
}

// main interface
export interface AppTextInterface {
    title: string
    
    // menuBar are some additional elements that can be added asides pages elements in menuBar
    menuBar: MenuBarItemInterface[]
    
    // pages are used to create the routes of the app as well as menuBar elements
    pages:PagesTextInterface[]

    // text for contact page
    contact:{
        heading:string
        contactLinks: contactLinkInterface[]
        text:string
        image:string
    }

    // text for projects page
    projects :{
        filter:string
    }

    bottomSection: {
        contact: string
        mail:string
        socialLinks: SocialLinkInterface[]
        copyright:{
            title:string
            text:string
        }
    }

    generalAppContent: {
        imgsPath:{
            professional:string
            personal:string
        }
    }
}

// ---------- elements of the main interface ----------

export interface MenuBarItemInterface {
    id:string
    text:string
    icon?:string
    link?:string
    subMenuItems:MenuBarSubMenuItemInterface[]
}
export interface MenuBarSubMenuItemInterface{
    key:string
    text:string
    icon?:string
}

export interface contactLinkInterface {
    id:string
    text:string
    linkText:string
    link:string
    icon:string
}

export interface SocialLinkInterface{
    id:string
    text:string
    icon:string
    link:string
    description:string
}

export interface PagesTextInterface {
    id:RouteId
    text:string
}