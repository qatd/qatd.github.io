import { FC, lazy, Suspense, useRef } from "react"
import { PostInterface } from "../../../interfaces/postsInterfaces"
import PostLinks from "../elements/PostLinks"
import PostKeypoints from "../elements/PostKeypoints"
import PostText from "../elements/PostText"
import PostTags from "../elements/PostTags"
import PostTitle from "../elements/PostTitle"
import FallbackLoading from "../../fallbackComponents/FallbackLoading"
import { useInView } from "framer-motion"

interface PostProjectLayoutProps {
    postData: PostInterface
    tabletScreen: boolean
}

const PostMedias = lazy(() => import('../elements/PostMedias'))

const PostProjectLayout: FC<PostProjectLayoutProps> = ({postData, tabletScreen}) => {

    const containerRef = useRef<HTMLDivElement | null>(null)
    const inView = useInView(containerRef, { margin: "500px 0px 500px 0px", amount: 0, once: true })

    return (
        <>
            <div className={`postTopSection ${tabletScreen ? 'postTopSection-mobile' : ''}`}>
                <PostTitle title={postData.title} logo={postData.logo} description={postData.description}/>
                <PostTags tagsId={postData.tagsId} tagVariant='project' />
            </div>
            <div ref={containerRef} className={`postContentSection postContentSection-project ${tabletScreen ? 'postContentSection-smallerScreen' : ''}`}>
                
                <Suspense fallback={<FallbackLoading />}>
                    {inView && <PostMedias medias={postData.medias}/>}
                </Suspense>
                
                <div className="postContentSection-description">
                    <PostText textParagraphs={postData.postTextParagraphs}/>
                    <div className="divider3"></div>
                    <PostKeypoints keypoints={postData.postTextKeyPoints?.points} keypointsTitle={postData.postTextKeyPoints?.text}/>
                    <PostLinks links={postData.postsLinks} linkTarget='_blank' />
                </div>
            </div>
        </>
    )
}

export default PostProjectLayout