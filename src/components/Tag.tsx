import styled from "styled-components"
import { useTags } from "../contexts/useTags"

// below, the values for the colors are not mean to change, it uses the same colors in both light and dark mode
const TagGlobalStyle = styled.div`
    display: flex;
    align-items: center;
    background: var(--color2);
    color: var(--color1);
    font-size: .8rem;
    padding: .15rem 1rem;
    padding-left: .4rem;
    column-gap: .5rem;

    // style for tag in the home, in presentation
    &.presentation-tag{
        font-size:.9rem;
        padding:0.3rem 1.25rem;
        padding-left:.6rem;

        & svg{
            width:.9rem;
        }
    }

    & svg {
        width: .7rem;

        & .circle1 {
            fill: var(--color1);
        }
        & .circle2 {
            stroke: var(--color1);
        }
    }
    
    // style for tag inside the postFilter component
    &.postFilter-tag{
        background:var(--color1);
        color:var(--color2);
        &:hover{
            & svg{
                .circle1{fill:var(--color2)}
            }
        }

        & svg{
            .circle1{fill:none;}
            .circle2{stroke: var(--color2)}
        }
    }

    /* below the !important should be removed when the component TagSelector will be used */
    /* tag-selected is only meant to be used when tag component is used in post filter component, as a filter button */
    &.tag-selected{
        color:var(--color1);
        background:var(--color2);
        
        & svg{
            .circle1{
                fill:var(--color1) !important;
            }
            .circle2{
                stroke:var(--color1);
            }
        }
    }
`

interface TagProps {
    tagId:string
    isSelected?:boolean
    variant?:'postFilter' | 'project' | 'presentation'
}

const Tag:React.FC<TagProps> = ({tagId, isSelected, variant}) => {

    const {getTagById} = useTags()
    const tag = getTagById(tagId)

    if (!tag) {
        console.warn(`Tag with id "${tagId}" not found`)
        return null
    }

    return (
        <TagGlobalStyle 
            className={`
                tag 
                ${isSelected ? 'tag-selected' : ''} 
                ${variant === 'postFilter' ? 'postFilter-tag' : ''}
                ${variant === 'presentation' ? 'presentation-tag' : ''}
                ${variant === 'project' ? 'project-tag' : ''}
            `}
        >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="circle1" cx="9" cy="9" r="4" />
                <circle className="circle2" cx="9" cy="9" r="8.15" strokeWidth="1.7"/>
            </svg>
            {tagId && <p>{tag?.text}</p>}
        </TagGlobalStyle>
    )
}

export default Tag