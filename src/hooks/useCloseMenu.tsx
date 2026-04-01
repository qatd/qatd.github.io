import { RefObject, useEffect } from "react"

interface UseCloseMenuProps{
    openingState: boolean
    closing: () => void
    ref: RefObject<HTMLDivElement>
    refsToExclude?: RefObject<HTMLElement>[]
}

export const useCloseMenu = ({openingState, closing, ref, refsToExclude = []}:UseCloseMenuProps) => {
    
    // handle escape key press
    useEffect(() => {
        if (!openingState) return

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closing()
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [openingState, closing])

    // handle click outside the ref
    useEffect(() => {
        if (!openingState) return

        const handleClickOutside = (event:MouseEvent) => {
            const target = event.target as Node

            // if click inside the main ref
            if (ref.current?.contains(target)) return

            // if click inside element inside an array of ref
            if (refsToExclude.some(refToExclude => refToExclude.current?.contains(target))) return

            // click is outside all refs, close menu
            closing()
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openingState, closing, ref, ...refsToExclude])
}