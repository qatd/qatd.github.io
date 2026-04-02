import React, { useMemo } from 'react'
import styled from 'styled-components'
import { PostsInterface } from '../../interfaces/postsInterfaces'
import { useMediaQuery } from 'react-responsive'
import { screen_desktop_small } from '../../utils/responsiveUtils'
import TagCategoryLayout from './TagCategoryLayout'
import TagListLayout from './TagListLayout'
import { motion } from 'framer-motion'
import { slideFromRight } from '../../style/animations/animations'
import { useLanguage } from '../../contexts/useLanguage'
import { useTags } from '../../contexts/useTags'

// Styled component for both container and buttons
const StyleContainer = styled(motion.div)`
    display: flex;
    flex:.85;
    flex-direction:column;
    row-gap:2rem;
    place-self:flex-start;
    position:sticky;
    top:2rem;
    overflow-y: auto;
    max-height:calc(100vh - 4rem);
    &.postFilter-smallerScreen{
        position:unset;
        border-left:unset;
        padding-left:unset;
        overflow-y:unset;
        max-height:unset;
    }

    & .postFilter-title{
        font-weight:600;
    }
`

interface PostFilterProps {
    projectPosts: PostsInterface['projects']
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
    selectedTags: string[]
}

const PostFilter: React.FC<PostFilterProps> = ({ projectPosts, setSelectedTags, selectedTags }) => {
    
    const isOnSmallerScreen = useMediaQuery({maxWidth:screen_desktop_small})

    // get the text from the context
    const {appText} = useLanguage()

    // get function to get tag object from context
    const {getTagsGroupedByCategory} = useTags()

    // Extract all unique tags from the projects posts
    // we don't get them from tags context, because then we would get tags that are not used in projects
    const postsTagsIds = useMemo(
        () => Array.from(new Set(projectPosts.flatMap(post => post.tagsId ?? []))),
        [projectPosts]
    )

    // create the structure to group the tags by their category
    const tagsByCategory = useMemo(
        () => getTagsGroupedByCategory(postsTagsIds),
        [postsTagsIds, getTagsGroupedByCategory]
    )

    // Handle tag selection toggling
    const handleTagSelectionToggle = (tagId: string) => {
        setSelectedTags(prevSelectedTags =>
            prevSelectedTags.includes(tagId)
                ? prevSelectedTags.filter(selectedTag => selectedTag !== tagId)
                : [...prevSelectedTags, tagId]
        )
    }

    return (
        <StyleContainer 
            className={`postFilter ${isOnSmallerScreen ? 'postFilter-smallerScreen' : ''}`}
            variants={slideFromRight}
            initial='initial'
            animate='animate'
            // override exit inline so its transition is short (doesn't block page-level AnimatePresence mode='wait')
            exit={{ opacity: 0, x: 20, transition: { duration: 0.1, ease: 'easeIn' } }}
            transition={{duration:.4,ease:'easeInOut'}}
        >
            <p className='postFilter-title'>{appText.projects.filter}</p>
            {isOnSmallerScreen
                ? <TagListLayout postTagsIds={postsTagsIds} selectedTags={selectedTags} handleTagSelection={handleTagSelectionToggle} />
                : <TagCategoryLayout tagsByCategory={tagsByCategory} handleTagSelection={handleTagSelectionToggle} selectedTags={selectedTags}/>
            }
        </StyleContainer>
    )
}

export default PostFilter