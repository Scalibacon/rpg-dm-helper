import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AppRouter } from './routes'
import AppContextProvider from './contexts/AppContext'
import '@/styles/global.css'

const App = () => {
    const theme = extendTheme({
        styles: {
            global: {
                body: {
                    backgroundColor: 'gray.500',
                    fontFamily: 'Poppins, sans-serif',
                },
            },
        },
    })

    return (
        <ChakraProvider theme={theme}>
            <AppContextProvider>
                <AppRouter />
            </AppContextProvider>
        </ChakraProvider>
    )
}

export { App }