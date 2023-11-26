import { ChakraProvider } from '@chakra-ui/react'
import { AppRouter } from './routes'
import AppContextProvider from './contexts/AppContext'

const App = () => {
    return (
        <ChakraProvider>
            <AppContextProvider>
                <AppRouter />
            </AppContextProvider>
        </ChakraProvider>
    )
}

export { App }