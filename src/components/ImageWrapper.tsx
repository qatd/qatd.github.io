import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { PostMediasInterface } from "../interfaces/postsInterfaces"
import ButtonWithIcon from "./ButtonWithIcon"
import { createPortal } from 'react-dom'
import AnimationWrapper from "./AnimationWrapper"
import { bounce, progressiveShowUp, zoomEffect2 } from "../style/animations/animations"
import styled from "styled-components"

const Style = styled.div`
.imageWrapper{
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 2rem;
    background: var(--color3);
    
    & .imageWrapper-background{
        transition: ease-in-out 1s;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
    & .imageWrapper-closingButton{
        display: flex;
        padding: 0 2%;
        align-self: flex-end;
        z-index: 3;
        
        & .buttonWithIcon{
            padding: .7rem;
            background: var(--color3);
            border-radius: 5rem;
            cursor: pointer;
            transition: ease-in-out .15s;
            &:hover {
                filter:contrast(5);
            }
            &:active{
                scale:1.1;
            }
        }
        
        & img{
            width: 1rem;
        }
    }
    & .imageWrapper-items{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 2rem;
        z-index: 2;
        margin: 0rem 1rem;

        & img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: .5rem;
        }
    }
}
`

interface ImageWrapperProps {
    pathHdImage:PostMediasInterface['linkPathHd']
    imageDescription:PostMediasInterface['text']
    closingImageWrapper:()=>void
}

const ImageWrapper:React.FC<ImageWrapperProps> = ({pathHdImage, imageDescription, closingImageWrapper}) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    // Preload the image for smooth loading
    useEffect(() => {
        if (!pathHdImage) return
        let cancelled = false
        const img = new Image()
        img.onload = () => { if (!cancelled) setImageLoaded(true) }
        img.src = pathHdImage
        return () => { cancelled = true }
    }, [pathHdImage])

    // listening if the escape key is pressed when imageWrapper is loaded
    useEffect(() => {

        // if it receive an escape key from the listener, it will execute the function closingImageWrapper, sent as a prop
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closingImageWrapper()
        }
        
        // send all the keys listen to handleEscapeKey
        document.addEventListener('keydown', handleEscapeKey)
        
        // remove the event listener when not needed
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [closingImageWrapper])

    // Disable scroll on mount, enable scroll on unmount
    useEffect(() => {
        // Disable scrolling by adding overflow: hidden to body
        document.body.style.overflow = 'hidden'

        // Cleanup function to enable scrolling again when modal closes
        return () => {
            document.body.style.overflow = '' // Revert back to normal scrolling
        }
    }, [])

    return createPortal(
        <Style>
            <AnimationWrapper transitionDuration={.3} className="imageWrapper" animationType={progressiveShowUp}>
                
                <div className="imageWrapper-background" onClick={closingImageWrapper}></div>

                <motion.div 
                    transition={{duration:.25, ease:'easeInOut'}} 
                    className="imageWrapper-closingButton" 
                    variants={zoomEffect2} 
                    initial='initial' 
                    animate='animate' 
                    exit='exit' 
                    onClick={closingImageWrapper}
                >
                    <ButtonWithIcon imageName="close.svg"/>
                </motion.div>

                {imageLoaded && (
                    <motion.div
                        transition={{duration:.25, ease:'easeInOut'}}
                        className="imageWrapper-items" 
                        variants={bounce} 
                        initial='initial' 
                        animate='animate' 
                        exit='exit'
                    >
                        <img src={pathHdImage} alt={imageDescription} />
                        <p>{imageDescription}</p>
                    </motion.div>
                )}

            </AnimationWrapper>
        </Style>,
        document.body
    )
}

export default ImageWrapper