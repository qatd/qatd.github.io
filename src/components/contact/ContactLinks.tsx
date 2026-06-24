import styled from 'styled-components'
import { contactLinkInterface } from '../../interfaces/appTextInterfaces'
import ContactLink from './ContactLink'

interface StyleContainerProps {
    $isOnMobileScreen?:boolean
}

const StyleContainer = styled.div<StyleContainerProps>`
    display:flex;
    flex-direction:column;
    row-gap:2rem;
    align-items:start;
    padding:3.5rem;
    background:var(--color3);
    border: .1rem solid var(--color3);

    border-radius:1rem;

    ${props => props.$isOnMobileScreen && `
        padding:1.5rem;
        font-size:1rem;
        row-gap:3rem;
    `}
`

type ContactLinksProps = {
    contactLinks: contactLinkInterface[]
    isOnMobileScreen: boolean
}

const ContactLinks: React.FC<ContactLinksProps> = ({ contactLinks, isOnMobileScreen }) => {
    return (
        <StyleContainer $isOnMobileScreen={isOnMobileScreen}>
            {contactLinks.map((element) => (
                <ContactLink
                    key={element.id} 
                    text={element.text} 
                    icon={element.icon} 
                    linkText={element.linkText} 
                    link={element.link} 
                    isOnMobileScreen={isOnMobileScreen}
                />
            ))}
        </StyleContainer>
    )
}

export default ContactLinks