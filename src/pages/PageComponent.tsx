import { ReactNode } from 'react'
import AnimationWrapper from '../components/AnimationWrapper'
import { progressiveShowUpWithZoom, zoomEffect } from '../style/animations/animations'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/useLanguage'

const StyleContainer = styled.div`
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
        <StyleContainer>

            <AnimationWrapper className="pageComponent-pages" animationType={progressiveShowUpWithZoom} transitionDuration={.3}>
                <h2>{title}</h2>
            </AnimationWrapper>

            <AnimationWrapper className="pageComponent-pages" animationType={zoomEffect} transitionDuration={.2}>
                {children}
            </AnimationWrapper>

        </StyleContainer>
    )
}

export default PageComponent
