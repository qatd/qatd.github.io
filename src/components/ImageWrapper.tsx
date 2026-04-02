import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { PostMediasInterface } from "../interfaces/postsInterfaces"
import ButtonWithIcon from "./ButtonWithIcon"
import { createPortal } from 'react-dom'
import AnimationWrapper from "./AnimationWrapper"
import { imageViewerShowUp, progressiveShowUpWithZoom, zoomEffect2 } from "../style/animations/animations"
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
        position: absolute;
        top: 1rem;
        right: 1rem;
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
        row-gap: 1rem;
        z-index: 2;
        margin: 0rem 1rem;

        & img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: .5rem;
        }

        & .imageWrapper-counter{
            font-size: .8rem;
            opacity: .5;
        }
    }
    & .imageWrapper-navButton{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 3;

        &.imageWrapper-navButton--left{ left: 2%; }
        &.imageWrapper-navButton--right{ right: 2%; }

        & .buttonWithIcon{
            padding: .7rem;
            background: var(--color3);
            border-radius: 5rem;
            cursor: pointer;
            transition: ease-in-out .15s;
            &:hover{
                filter: contrast(5);
            }
            &:active{
                scale: 1.1;
            }
        }

        & img{
            width: 1rem;
        }
    }
}
`

interface ImageWrapperProps {
    images: PostMediasInterface[]
    currentIndex: number
    onNavigate: (direction: 1 | -1) => void
    // called after the exit animation fully completes
    closingImageWrapper: () => void
}

const ImageWrapper:React.FC<ImageWrapperProps> = ({images, currentIndex, onNavigate, closingImageWrapper}) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    // tracks direction so the slide animation knows which way to go
    const [navDirection, setNavDirection] = useState<1 | -1>(1)
    // controls the modal's own enter/exit; set to false to trigger exit animation
    const [isOpen, setIsOpen] = useState(true)
    // false on mount so image appears only after background blur animates in; set to false again on close
    const [imageVisible, setImageVisible] = useState(false)
    // ref mirrors imageVisible to avoid stale closures in handleClose
    const imageVisibleRef = useRef(false)
    // ref to distinguish close from navigation (both can trigger inner AnimatePresence onExitComplete)
    const isClosingRef = useRef(false)

    const currentImage = images[currentIndex]
    const pathHdImage = currentImage?.linkPathHd
    const imageDescription = currentImage?.text
    const hasMultipleImages = images.length > 1

    // delay image appearance until background blur has animated in (~400ms = transitionDuration on AnimationWrapper)
    useEffect(() => {
        const timer = setTimeout(() => {
            imageVisibleRef.current = true
            setImageVisible(true)
        }, 200)
        return () => clearTimeout(timer)
    }, [])

    // triggers image exit first; background blur exit is triggered once image animation completes
    // if closed before image ever appeared, skips directly to closing the background
    const handleClose = useCallback(() => {
        isClosingRef.current = true
        if (imageVisibleRef.current) {
            setImageVisible(false)
        } else {
            setIsOpen(false)
        }
    }, [])

    // Preload the image for smooth loading
    useEffect(() => {
        if (!pathHdImage) return
        setImageLoaded(false)
        let cancelled = false
        const img = new Image()
        img.onload = () => { if (!cancelled) setImageLoaded(true) }
        img.src = pathHdImage
        return () => { cancelled = true }
    }, [pathHdImage])

    const handleNavigate = (direction: 1 | -1) => {
        setNavDirection(direction)
        onNavigate(direction)
    }

    // keyboard navigation: Escape to close, arrows to navigate
    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleClose()
            else if (event.key === 'ArrowLeft' && hasMultipleImages) { setNavDirection(-1); onNavigate(-1) }
            else if (event.key === 'ArrowRight' && hasMultipleImages) { setNavDirection(1); onNavigate(1) }
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [handleClose, onNavigate, hasMultipleImages])

    // Disable scroll on mount, enable scroll on unmount
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [])

    return createPortal(
        <Style>
            {/*
                AnimatePresence lives inside the portal so it can properly track
                the AnimationWrapper's exit animation before unmounting.
                onExitComplete notifies PostMedias once the animation is fully done.
            */}
            <AnimatePresence onExitComplete={closingImageWrapper}>
                {isOpen && (
                    <AnimationWrapper transitionDuration={.2} className="imageWrapper" animationType={imageViewerShowUp}>

                        <div className="imageWrapper-background" onClick={handleClose}></div>

                        <motion.div
                            transition={{duration:.25, ease:'easeInOut'}}
                            className="imageWrapper-closingButton"
                            variants={zoomEffect2}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                            onClick={handleClose}
                        >
                            <ButtonWithIcon imageName="close.svg"/>
                        </motion.div>

                        {/* prev / next nav buttons — only shown when there are multiple images */}
                        {hasMultipleImages && (
                            <>
                                <div className="imageWrapper-navButton imageWrapper-navButton--left" onClick={() => handleNavigate(-1)}>
                                    <ButtonWithIcon imageName="arrow-left.svg"/>
                                </div>
                                <div className="imageWrapper-navButton imageWrapper-navButton--right" onClick={() => handleNavigate(1)}>
                                    <ButtonWithIcon imageName="arrow-right.svg"/>
                                </div>
                            </>
                        )}

                        <AnimatePresence
                            mode='wait'
                            custom={navDirection}
                            onExitComplete={() => { if (isClosingRef.current) setIsOpen(false) }}
                        >
                            {imageLoaded && imageVisible && (
                                <motion.div
                                    key={currentIndex}
                                    custom={navDirection}
                                    transition={{duration:.2, ease:'easeInOut'}}
                                    className="imageWrapper-items"
                                    variants={progressiveShowUpWithZoom}
                                    initial='initial'
                                    animate='animate'
                                    exit='exit'
                                >
                                    <img src={pathHdImage} alt={imageDescription} />
                                    {imageDescription && <p>{imageDescription}</p>}
                                    {hasMultipleImages && (
                                        <span className="imageWrapper-counter">{currentIndex + 1} / {images.length}</span>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </AnimationWrapper>
                )}
            </AnimatePresence>
        </Style>,
        document.body
    )
}

export default ImageWrapper
