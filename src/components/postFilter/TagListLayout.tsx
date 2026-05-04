import styled from 'styled-components'
import TagSelector from './TagSelector'
import { useState } from 'react'

const StyleContainer = styled.div`
    display: flex;
    align-content:flex-start;
    column-gap: .7rem;
    row-gap:.7rem;
    flex-wrap: wrap;
    align-items:center;
`
const ShowMoreButton = styled.div`
    cursor:pointer;
    transition:ease-in-out .15s;
    padding: .15rem 1rem;
    border:var(--border6);
    background: var(--color3);
    font-size:.8rem;

    &:hover{
        filter:brightness(.95);
    }
    &:active{
        transform:scale(.97);
    }
`

type TagListLayoutProps = {
    postTagsIds:string[]
    selectedTags:string[]
    handleTagSelection:(tagId:string) => void
}

const TagListLayout: React.FC<TagListLayoutProps> = ({postTagsIds, selectedTags, handleTagSelection}) => {

    // for mobile, when tags are hidden to avoid having too many that takes too much place
    const [tagsHidden, setTagsHidden] = useState<boolean|undefined>(true)

    return (
        <StyleContainer>
            {postTagsIds.slice(0, tagsHidden ? 3 : postTagsIds.length).map(tagId => (
                <TagSelector 
                    key={tagId} 
                    className='tagSelector' 
                    handleTagSelection={handleTagSelection} 
                    tagId={tagId} 
                    selectedTags={selectedTags}
                />
            ))}

            {tagsHidden && 
                <ShowMoreButton onClick={() => setTagsHidden(!tagsHidden)}>
                    show more...
                </ShowMoreButton>
            }
        </StyleContainer>
    )
}

export default TagListLayout