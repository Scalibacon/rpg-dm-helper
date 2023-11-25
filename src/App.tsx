import { ChakraProvider } from '@chakra-ui/react'
import { AppRouter } from './routes'

const App = () => {
    return (
        <ChakraProvider>
            <AppRouter />
        </ChakraProvider>
    )
}

export { App }