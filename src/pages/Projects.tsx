import { TagInterface } from "../interfaces/postsInterfaces"
import { useMemo, useState } from "react"
import { screen_desktop_medium, screen_desktop_small } from "../utils/responsiveUtils"
import { useMediaQuery } from "react-responsive"
import { AnimatePresence, motion } from "framer-motion"
import { postItem } from "../style/animations/animations"
import styled from "styled-components"
import Post from "../components/post/Post"
import PostFilter from "../components/postFilter/PostFilter"
import { usePost } from "../contexts/usePost"

const StyleContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4rem;
    @include transition(.1s);

    &.projects-smallerScreen{
        flex-direction: column-reverse;
    }

    & .projectItems{
        display: flex;
        flex-direction: column;
        row-gap: 3rem;
        flex: 2.5;

        &.projectItems-mediumScreen{
            flex:2;
        }
    }

    /* > * {
        content-visibility:auto;
        contain-intrinsic-size:40rem;
    } */
`

const Projects = () => {

    // below 1200px screen width
    const isOnDesktopSmallScreen = useMediaQuery({maxWidth:screen_desktop_small})
    // below 1600px screen width
    const isOnDesktopMediumScreen = useMediaQuery({maxWidth:screen_desktop_medium})

    // get the posts from the context
    const {getProjectPosts} = usePost()

    const projectsPosts = getProjectPosts()

    // tags selected in PostFilterComponent
    const [selectedTags, setSelectedTags] = useState<TagInterface['id'][]>([])

    // filtering posts
    const filteredPosts = useMemo(() => {
        return projectsPosts.filter(post => 
            selectedTags.length === 0 ||
            (post.tagsId?.some(tagId => selectedTags.includes(tagId)) || false)
        )
    },[projectsPosts,selectedTags])

    return (
        <StyleContainer className={`projects ${isOnDesktopSmallScreen ? 'projects-smallerScreen' : ''}`}>
            
            <div className={`projectItems ${isOnDesktopMediumScreen ? 'projectItems-mediumScreen' : ''}`}>
                <AnimatePresence mode='sync'>
                    {filteredPosts.map((projectData, index) => (
                        <motion.div
                            key={projectData.id}
                            variants={postItem}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            custom={index}
                            layout
                        >
                            <Post
                                postData={projectData}
                                variantType='project'
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <PostFilter projectPosts={projectsPosts} setSelectedTags={setSelectedTags} selectedTags={selectedTags}/>
        </StyleContainer>
    )
}

export default Projects