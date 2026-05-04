import styled from 'styled-components'
import { motion } from 'framer-motion'
import { zoomEffect4 } from '../../../style/animations/animations'
import { forwardRef } from 'react'
import { useLanguage } from '../../../contexts/useLanguage'

// here, StyleContainer is a Framer "motion.div", not a simple div
const StyleContainer = styled(motion.div)`
    display:flex;
    flex-direction:column;
    row-gap:.5rem;
    position:absolute;
    transform:translate(-50%,2.5rem);
    left:50%;
    background:var(--color3);
    padding:1rem;
    border: solid .1rem var(--color3);
    backdrop-filter:blur(1rem);
    
    & .languageItem{
        padding:.15rem 1rem;
        cursor:pointer;
        transition:ease-in-out .1s;
        font-size:.85rem;
        
        &:hover{
            background:var(--color3);
            filter:brightness(.9);
        }
        &:active{
            scale:.97;
        }
    }
    & .languageItem-selected{
        color:var(--color1);
        background:var(--color2);

        &:hover{
            background:var(--color2);
        }
    }
`

const LanguageSwitcher = forwardRef<HTMLDivElement>((_,ref) => {

    const {setLanguage, currentLanguage} = useLanguage()

    const languagesItems = [
        { languageCode: 'en' as const, label: 'English' },
        { languageCode: 'fr' as const, label: 'Français' }
    ]

    const handleLanguageChange = (language: 'en'| 'fr') => setLanguage(language)

    return (
        <StyleContainer 
            ref={ref}
            variants={zoomEffect4}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
                duration:.1,
                ease:'easeInOut'
            }}
        >
            {languagesItems.map(language => (
                <div 
                    key={language.languageCode} 
                    className={`languageItem ${language.languageCode === currentLanguage ? 'languageItem-selected' : ''}`}
                    onClick={() => handleLanguageChange(language.languageCode)}
                >
                    {language.label}
                </div>
            ))}
        </StyleContainer>
    )
})

LanguageSwitcher.displayName = 'LanguageSwitcher'

export default LanguageSwitcher