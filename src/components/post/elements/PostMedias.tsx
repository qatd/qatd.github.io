import ReactPlayer from "react-player/youtube"
import { PostInterface } from "../../../interfaces/postsInterfaces"
import { screen_tablet } from "../../../utils/responsiveUtils"
import { useMediaQuery } from "react-responsive"
import ImageWrapper from "../../ImageWrapper"
import { useState } from "react"
import styled from "styled-components"

const StyleContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    padding: 2rem;
    align-self: start;
    max-width: 22rem;
    
    & .postMedias-imageSection{
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        align-self: center;
        
        & img{
            width: 5rem;
            cursor:pointer;
            border:solid .15rem var(--color3);
            padding: .2rem;
            transition: .15s ease-in-out 0s;

            @media (hover:hover){
                &:hover{
                    filter: brightness(.7);
                }
            }
            &:active{
                transform: scale(.97);
            }
        }
    }
    & .postMedias-videoSection{

        & .postMedias-video{

            & p{
                color: var(--color2);
                font-style: italic;
                font-size: .8rem;
                text-align: center;
            }
        }
    }

    &.postMedias-smallScreen{
        align-self: center;
    }
`

interface PostMediasProps {
    medias: PostInterface['medias']
}

const PostMedias:React.FC<PostMediasProps> = ({medias}) => {

    const smallScreen = useMediaQuery({maxWidth:screen_tablet})

    // index of the currently open image (null = viewer closed)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    if (!medias) return null

    const openImageWrapper = (index: number): void => {
        setSelectedIndex(index)
    }

    const closingImageWrapper = (): void => {
        setSelectedIndex(null)
    }

    const navigateImage = (direction: 1 | -1): void => {
        if (selectedIndex === null || !medias.images) return
        const total = medias.images.length
        setSelectedIndex((selectedIndex + direction + total) % total)
    }

    return (
        <StyleContainer className={`postMedias ${smallScreen ? 'postMedias-smallScreen' : ''}`}>
            
            {medias.videos && 
                <div className="postMedias-videoSection">
                    { medias.videos.map((video) => (
                        <div key={video.id} className="postMedias-video">
                            <ReactPlayer url={video.linkPath} controls width='100%' height='12rem'/>
                            <p className="postMedias-comment">{video.text}</p>
                        </div>
                    ))}
                </div>
            }

            {medias.videos && <div className="divider3"></div>}
            
            {medias.images && 
                <div className="postMedias-imageSection">
                    {medias.images.map((image, index) => (
                        <img key={image.id} src={image.linkPath} alt={image.text} onClick={() => openImageWrapper(index)} loading="lazy" decoding="async"/>
                    ))}
                </div>
            }
            
            {/* ImageWrapper manages its own enter/exit animation internally via portal */}
            {selectedIndex !== null && medias.images &&
                <ImageWrapper
                    images={medias.images}
                    currentIndex={selectedIndex}
                    onNavigate={navigateImage}
                    closingImageWrapper={closingImageWrapper}
                />
            }

        </StyleContainer>
    )
}

export default PostMedias