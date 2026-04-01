import { Suspense } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Header from "./components/header/Header"
import { ErrorBoundary } from "react-error-boundary"
import { AnimatePresence } from "framer-motion"
import Footer from "./components/bottomSection/Footer"
import PageComponent from "./pages/PageComponent"
import FallbackError from "./components/fallbackComponents/FallbackError"
import FallbackLoading from "./components/fallbackComponents/FallbackLoading"
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
                                    <ErrorBoundary fallback={<FallbackError/>}>
                                        <Suspense fallback={<FallbackLoading/>}>
                                            <PageComponent title={pageTitle}>
                                                <Page/>
                                            </PageComponent>
                                        </Suspense>
                                    </ErrorBoundary>
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