import styled from 'styled-components'
import ButtonWithIcon from '../ButtonWithIcon'

const StyleContainer = styled.a`

`

const SocialLinkButtonStyle = styled(ButtonWithIcon)`
    display: flex;
    position: relative;
    cursor: pointer;
    padding:.6rem;
    transition:.15s ease-in-out;
    @media (hover:hover){
        &:hover{
            background: var(--color3);

            & span {
                transform: translate(-50%, .1rem);
            }
        }
    }
    // showing the description if hovered
    @media (hover:hover){
        &:hover > span{
            visibility: visible;
            opacity: 1;
            transition-delay: .25s;
        }
    }
    // showing the description if clicked
    &:active > span{
        visibility: visible;
        opacity: 1;
        transition-delay: .3s;
        transform: translate(-50%, .1rem);
    }

    & > img {
        width: 1rem;
        height: 1rem;
    }
        
    // properties of the description
    & > span {
        position: absolute;
        visibility: hidden;
        opacity: 0;
        z-index: 2;

        transition:.15s ease-in-out;
        font-size: .6rem;
        font-weight: 400;
        background: var(--color2);
        color: var(--color1);
        padding: .2rem .7rem;
        inline-size: max-content;
        box-shadow: var(--borderShadow5);
        left: 50%;
        transform: translate(-50%, -0.25rem);
        top: 2.7rem;

        // creating the description
        &::after{
            content: '';
            position: absolute;
        }
        // hiding the description if hovered
        @media (hover:hover){
            &:hover{
                display: none;
            }
        }
    }
`

type SocialLinkProps = {
    icon:string
    description:string
    link:string
}

const SocialLink: React.FC<SocialLinkProps> = ({icon,description, link}) => {
    return (
        <StyleContainer href={link} target='_blank'>
            <SocialLinkButtonStyle imageName={icon} className="linkItem" description={description}/>
        </StyleContainer>
    )
}

export default SocialLink