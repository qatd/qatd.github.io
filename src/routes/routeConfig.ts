import Projects from '../pages/Projects'
import Contact from '../pages/Contact'

// Single source of truth for route structure.
// To add a page: add an entry here, add text in appText.json pages array for each language.
export const ROUTES = [
    { id: '',        component: Projects },
    { id: 'contact', component: Contact  },
] as const

export type RouteId = typeof ROUTES[number]['id']
