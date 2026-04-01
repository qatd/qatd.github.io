import styled, { keyframes } from "styled-components"

const popIn = keyframes`
    0% { opacity: 0; transform: scale(0.8); }
    60% { transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
`

const StyleContainer = styled.div`
    animation: ${popIn} 0.5s ease-out;
    background: var(--color3);
    display: flex;
    align-self: center;
    padding: .5rem 2rem;
    border-radius: 5rem;
    margin: 2rem 0rem;
    transition: .15s;
`

const FallbackLoading = () => {
    return (
        <StyleContainer>
            <p>loading...</p>
        </StyleContainer>
    )
}

export default FallbackLoading
