import { ReactNode } from 'react'
import AnimationWrapper from '../components/AnimationWrapper'
import { progressiveShowUpWithZoom } from '../style/animations/animations'

interface PageComponentProps {
    title: string
    children: ReactNode
}

const PageComponent: React.FC<PageComponentProps> = ({ title, children }) => {
    return (
        <div className="pageComponent">

            <AnimationWrapper className="pageComponent-pages" animationType={progressiveShowUpWithZoom} transitionDuration={.3}>
                <h2>{title}</h2>
            </AnimationWrapper>

            <AnimationWrapper className="pageComponent-pages">
                {children}
            </AnimationWrapper>

        </div>
    )
}

export default PageComponent
