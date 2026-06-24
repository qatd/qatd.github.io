import { useMediaQuery } from "react-responsive"
import { screen700 } from "../utils/responsiveUtils"
import styled from "styled-components"
import ContactLinks from "../components/contact/ContactLinks"
import { useLanguage } from "../contexts/useLanguage"

const StyleContainer = styled.div`
    display: flex;
    flex-direction:column;
    transition:.1s ease-in-out;
    row-gap:3rem;
    align-items:center;
    margin-top:2rem;
    &.contact-mobile{
        h4{
            font-size:1.1rem;
        }
    }

    & > p{
        font-weight:600;
    }
`

const Contact = () => {

    const isOnMobileScreen = useMediaQuery({maxWidth:screen700})

    const {appText} = useLanguage()
    const contactData = appText.contact

    return (
        <StyleContainer className={isOnMobileScreen ? 'contact-mobile' : ''}>
            <ContactLinks contactLinks={contactData.contactLinks} isOnMobileScreen={isOnMobileScreen} />
        </StyleContainer>
    )
}

export default Contact