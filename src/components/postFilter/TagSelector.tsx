import { FC } from "react"
import styled from "styled-components"
import Tag from "../Tag"

const StyleContainer = styled.div`
    cursor:pointer;
    transition:ease-in-out .1s;
    filter:brightness(.99);
`

interface TagSelectorProps{
    className?:string
    handleTagSelection:(tagId:string) => void
    tagId:string
    selectedTags:string[]
}

const TagSelector:FC<TagSelectorProps> = ({className, handleTagSelection, tagId, selectedTags}) => {
    return (
        <StyleContainer className={className} onClick={() => handleTagSelection(tagId)}>
            <Tag tagId={tagId} isSelected={selectedTags.includes(tagId)} variant="postFilter"/>
        </StyleContainer>
    )
}

export default TagSelector