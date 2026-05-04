import { useMediaQuery } from "react-responsive"
import { screen_mobile, screen_tablet } from "../../utils/responsiveUtils"
import { PostInterface } from "../../interfaces/postsInterfaces"
import { PostVariantProps } from "../../interfaces/globalPropsInterfaces"
import styled from "styled-components"

import PostPresentationLayout from "./layouts/PostPresentationLayout"
import PostProjectLayout from "./layouts/PostProjectLayout"

const StyleContainer = styled.div`
    display: flex;
    max-width: 70rem;

    /* style for projects posts */
    &.post-project{
        padding: 2rem;
        background: var(--color3);
        flex-direction: column;
        row-gap: 2.5rem;
        backdrop-filter:blur(3rem);
        &.post-mobile{
            padding:1rem 1.5rem;
        }
    }

    /* style for mobile < 700 */
    &.post-mobile{
        width: unset;
        row-gap: 2rem;
    }

    /* style for tablet < 1000 */
    &.post-tablet{
        width: unset;
    }

    /* --------------- postContentSection --------------- */
    .postContentSection{
        display: flex;
        column-gap: 2rem;
        transition: .1s ease-in-out;
        &.postContentSection-smallerScreen{
            flex-direction: column;
        }
        &.postContentSection-presentation{
            /* & .postContentSection-description{
                row-gap: 5rem;
            } */
        }

        & .postContentSection-description{
            display: flex;
            flex-direction: column;
            flex: 2;
            row-gap: 2rem;
            transition: .1s ease-in-out;
        }
    }

    /* --------------- postTopSection --------------- */
    .postTopSection {
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
        transition: .1s ease-in-out 0s;

        &.postTopSection-mobile{
            row-gap: 2rem;
        }
    }
`

// style for the layout components
export const PostContentSectionStyle = styled.div`
    display: flex;
    column-gap: 2rem;
    transition: .1s ease-in-out 0s;
    
    & .postContentSection-description{
        display: flex;
        flex-direction: column;
        flex: 2;
        row-gap: 2rem;
    }
    
    &.postContentSection-smallerScreen{
        flex-direction: column;
        row-gap: 2rem;
    }
    &.postContentSection-presentation{
        & .postContentSection-description{
            row-gap: 5rem;
        }
    }
`

// style for the layout components
export const PostTopSectionStyle = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    transition: .1s ease-in-out 0s;

    &.postTopSection-mobile{
        row-gap: 2rem;
    }
`

interface PostProps {
    postData: PostInterface
}

const Post:React.FC<PostProps & PostVariantProps> = ({ postData, variantType }) => {

    const mobileScreen = useMediaQuery({maxWidth:screen_mobile})
    const tabletScreen = useMediaQuery({maxWidth:screen_tablet})

    return (
        <StyleContainer 
            className={`
                post 
                ${variantType ? 'post-'+variantType : ''}
                ${mobileScreen ? 'post-mobile' : ''}
                ${tabletScreen ? 'post-tablet' : ''}
            `}
        >
            {variantType === 'presentation' 
                ? <PostPresentationLayout postData={postData} tabletScreen={tabletScreen} />
                : <PostProjectLayout postData={postData} tabletScreen={tabletScreen}/>
            }

        </StyleContainer>
    )
}

export default Post