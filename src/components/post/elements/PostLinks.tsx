import styled from "styled-components"
import { FC } from "react"
import { PostLinkInterface } from "../../../interfaces/postsInterfaces"

interface PostLinksProps {
    links?:PostLinkInterface[]
    linkTarget:'_self' | '_blank'
}

const StyleContainer = styled.div`
    display: flex;
    align-self: flex-end;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: flex-end;
`

const StyledLink = styled.a`
    cursor: pointer;
    padding: .3rem 1rem;
    font-size: .9rem;
    font-weight: 500;
    text-underline-offset: .4rem;
    text-decoration: underline;
    transition: .1s ease-in-out;

    @media (hover: hover) {
        &:hover { background: var(--color3); }
    }

    &:active {
        transform: scale(.98);
        box-shadow: 0 0 0rem .15rem var(--color3);
    }
`

const PostLinks: FC<PostLinksProps> = ({links, linkTarget}) => {
    if (!links || links.length === 0) return null
    return (
        <StyleContainer>
            {links.map((link) => <StyledLink
                key={link.link}
                href={link.link}
                target={linkTarget}>{link.linkName}</StyledLink>
            )}
        </StyleContainer>
    )
}

export default PostLinks
