import styled from "styled-components"
import { FC } from "react"
import { PostInterface } from "../../../interfaces/postsInterfaces"

const StyleContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: .7rem;

    &.postText-presentation{
        font-weight:200;
    }
`

interface PostTextProps {
    textParagraphs:PostInterface['postTextParagraphs']
    className?:string
}

const PostText: FC<PostTextProps> = ({textParagraphs, className}) => {
    return (
        <StyleContainer className={`${className ? 'postText-'+className : ''}`}>
            {textParagraphs.map((postTextParagraph, index)=> (
                <p key={index}>{postTextParagraph}</p>
            ))}
        </StyleContainer>
    )
}

export default PostText