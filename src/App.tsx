import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Header from "./components/header/Header"
import { AnimatePresence } from "framer-motion"
import Footer from "./components/bottomSection/Footer"
import PageComponent from "./pages/PageComponent"
import ErrorSuspenseWrapper from "./components/fallbackComponents/ErrorSuspenseWrapper"
import { useMediaQuery } from "react-responsive"
import { screen_mobile } from "./utils/responsiveUtils"
import styled from "styled-components"
import { useLanguage } from "./contexts/useLanguage"
import { GlobalStyle } from "./style/globalRules"
import { ROUTES } from "./routes/routeConfig"

const StyleContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12rem;
    transition:.2s ease-in-out;

    &.app-mobile{
        row-gap: 4rem;
    }
`

const App = () => {

    // get text from the context provider
    const {appText} = useLanguage()

    // getting the location datas in the app
    const location = useLocation()

    const isOnMobileScreen = useMediaQuery({maxWidth:screen_mobile})

    return (
        <StyleContainer className={`app ${isOnMobileScreen ? 'app-mobile' : ''}`}>
            <GlobalStyle />
            
            <Header/>
            
            <AnimatePresence mode='wait'>

                <Routes location={location} key={location.pathname}>

                    {ROUTES.map(({ id, component: Page }) => {
                        // look up the translated page title from appText
                        const pageTitle = appText.pages.find(p => p.id === id)?.text ?? id
                        return (
                            <Route
                                key={id}
                                path={id}
                                element={
                                    <ErrorSuspenseWrapper>
                                        <PageComponent title={pageTitle}>
                                            <Page/>
                                        </PageComponent>
                                    </ErrorSuspenseWrapper>
                                }
                            />
                        )
                    })}

                    {/* in case of a mistype in the url, this route below will redirect to the root / */}
                    <Route path="*" element={<Navigate to="/" replace />}/>

                </Routes>
            </AnimatePresence>

            <Footer/>
        </StyleContainer>
    )
}

export default App