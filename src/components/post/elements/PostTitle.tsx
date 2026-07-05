import { FC } from "react"
import styled from "styled-components"

const StyleContainer = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction:column;

    & .postTitle-titleRow {
        display: flex;
        align-items: center;
        gap: .75rem;
        min-width: 0;
    }

    & .postTitle-logo {
        height: 1.8rem;
        width: auto;
        object-fit: contain;
        flex-shrink: 0;
    }

    & h3 {
        min-width: 0;
        overflow-wrap: break-word;
    }

    & .postTitle-dot{
        align-self: center;
        flex-shrink: 1;
    }

    & .postTitle-description{
        font-style: italic;
        flex-shrink: 1;
        font-size:.9rem;
    }
`

interface PostTitleProps {
    title?: string
    logo?: string
    description?: string
}

const PostTitle: FC<PostTitleProps> = ({ title, logo, description }) => {
    return (
        <StyleContainer>
            <div className="postTitle-titleRow">
                {logo && <img className="postTitle-logo" src={logo} alt={title} loading="lazy" decoding="async"/>}
                {title && <h3>{title}</h3>}
            </div>
            <p className="postTitle-description">{description}</p>
        </StyleContainer>
    )
}

export default PostTitle