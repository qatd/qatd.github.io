import { ReactNode } from 'react'
import AnimationWrapper from '../components/AnimationWrapper'
import { progressiveShowUpWithZoom, zoomEffect } from '../style/animations/animations'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/useLanguage'
import { motion, Variants } from 'framer-motion'

// Orchestrates child animations: stagger title → content on enter, reverse on exit
const pageContainerVariants: Variants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.1 } },
    exit:    { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
}

const StyleContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    margin: 0 3%;
    row-gap: 2rem;
    transition: ease-in-out .1s;
`

interface PageComponentProps {
    children: ReactNode
}

const PageComponent: React.FC<PageComponentProps> = ({ children }) => {
    const { pathname } = useLocation()
    const { appText } = useLanguage()

    // Strip leading slash to match route ids (e.g. '/projects' → 'projects')
    const routeId = pathname.replace(/^\//, '')
    const title = appText.pages.find(p => p.id === routeId)?.text ?? routeId

    return (
        <StyleContainer
            variants={pageContainerVariants}
            initial='initial'
            animate='animate'
            exit='exit'
        >
            {/* propagate=true: parent StyleContainer controls when this animates */}
            <AnimationWrapper propagate className="pageComponent-pages" animationType={progressiveShowUpWithZoom} transitionDuration={.2}>
                <h2>{title}</h2>
            </AnimationWrapper>

            <AnimationWrapper propagate className="pageComponent-pages" animationType={zoomEffect} transitionDuration={.15}>
                {children}
            </AnimationWrapper>

        </StyleContainer>
    )
}

export default PageComponent
