import styled from 'styled-components'
import ButtonWithIcon from '../ButtonWithIcon'

interface StyleContainerProps {
    $isOnMobileScreen:boolean
}

const StyleContainer = styled.div<StyleContainerProps>`
    display:flex;
    gap:1rem;
    align-items:center;
    transition:.1s ease-in-out;
    ${props => props.$isOnMobileScreen && `
        flex-direction:column;
        align-items:start;
    `}
`

const StyledLink = styled.a`
    cursor: pointer;
    transition:.15s ease-in-out;
    font-weight: 500;
    text-underline-offset: .25rem;
    word-break: break-all;
    @media (hover:hover){
        &:hover{
            text-decoration: underline;
            text-underline-offset: .4rem;
        }
    }
    &:active{
        /* box-shadow: 0 0 0rem .15rem var(--color3); */
        transform: scale(.98);
    }
`

const StyledButtonWithIcon = styled(ButtonWithIcon)`
    & img{
        width:1rem
    }
`

type ContactLinkProps = {
    text:string
    linkText:string
    link:string
    icon:string
    isOnMobileScreen:boolean
}

const ContactLink: React.FC<ContactLinkProps> = ({text,link,linkText,icon,isOnMobileScreen}) => {
    return (
        <StyleContainer $isOnMobileScreen={isOnMobileScreen} >
            {!isOnMobileScreen && <StyledButtonWithIcon imageName={icon} />}
            <p>{text}</p>
            <StyledLink href={link} target='_blank'>{linkText}</StyledLink>
        </StyleContainer>
    )
}

export default ContactLink