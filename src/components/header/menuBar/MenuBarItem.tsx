import { AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"
import AnimationWrapper from "../../AnimationWrapper"
import ButtonWithIcon from "../../ButtonWithIcon"
import { screen_mobile } from "../../../utils/responsiveUtils"
import { useMediaQuery } from "react-responsive"
import { zoomEffect3 } from "../../../style/animations/animations"
import { forwardRef } from "react"
import styled from "styled-components"

const StyleContainer = styled.div`
    display: flex;
    position: relative;
    transition: .15s ease-in-out;
    
    // responsive rules
    &.menuBarItem-mobile{
        & .menuBarItem-dotPoint{
            top: 120%;
            left: 50%;
        }
        
        & .menuBarItem-button{
            padding: .2rem 1rem;
        }
        &.menuBarItem-selected{
            background: var(--color3);
        }
    }
    
    & .menuBarItem-buttonWithText{
        cursor: pointer;
        padding: .2rem 1.3rem;
        white-space: nowrap;
        transition: .1s ease-in-out;
        &:hover{
            background: var(--color3);
        }
        &:active{
            transform: scale(.98);
        }
    }
    
    & .menuBarItem-dotPoint{
        position: absolute;
        width: .3rem;
        height: .3rem;
        background: var(--color2);
        top: 140%;
        left: 50%;
    }
    
    & .menuBarItem-buttonWithIcon {
        padding: .5rem;
        cursor: pointer;
        transition: .15s ease-in-out;
        &:active{
            scale: .93;
        }
        &:hover{
            background: var(--color3);
        }

        & img{
            width: 1rem;
        }
    }
`

interface MenuBarItemProps {
    id: string
    text: string
    icon?: string
    toggleLanguageSwitcher?: () => void
}

const MenuBarItem = forwardRef<HTMLDivElement, MenuBarItemProps>(({ id, text, icon, toggleLanguageSwitcher }, ref) => {

    // function to gather the current path
    const location = useLocation()

    // comparing the current path in the app, with the component's
    // slice is used because pathname is returning a path with a "/", so we want to gather only the path name without the "/"
    const isElementSelected = location.pathname.slice(1) === id

    const isOnMobileScreen = useMediaQuery({ maxWidth: screen_mobile })

    return (
        <StyleContainer
            ref={ref}
            className={`menuBarItem ${isOnMobileScreen ? 'menuBarItem-mobile' : ''} ${isElementSelected ? 'menuBarItem-selected' : ''}`}
            onClick={toggleLanguageSwitcher || undefined}
        >
            {/* if icon isn't provided, then only the text is displayed, and the class is menuBarItem-buttonWithText */}
            {!icon && <div className="menuBarItem-buttonWithText">{text}</div>}

            {icon && <ButtonWithIcon imageName={icon} className="menuBarItem-buttonWithIcon" />}

            <AnimatePresence mode="wait">
                {isElementSelected && !isOnMobileScreen && <AnimationWrapper transitionDuration={.2} className="menuBarItem-dotPoint" animationType={zoomEffect3} />}
            </AnimatePresence>
        </StyleContainer>
    )
})

export default MenuBarItem