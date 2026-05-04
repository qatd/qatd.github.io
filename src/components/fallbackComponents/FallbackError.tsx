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
    margin: 2rem;
    transition: .15s;
`

const FallbackError = () => {
    return (
        <StyleContainer>
            <p>An error occurred...</p>
        </StyleContainer>
    )
}

export default FallbackError
