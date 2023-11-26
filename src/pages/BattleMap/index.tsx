import { AppContext } from "@/contexts/AppContext"
import { AppActionKind } from "@/reducers/AppReducer"
import { Text } from "@chakra-ui/react"
import { useContext } from "react"

const BattleMap = () => {
    const { appState, appDispatch } = useContext(AppContext)

    console.log(appState)
    return (
        <Text onClick={() => appDispatch({
            type: AppActionKind.ADD_CHAR,
            payload: {
                char: {
                    id: 1,
                    name: 'aaa',
                    coordinates: {
                        x: 0,
                        y: 0
                    }
                }
            }
        })}>
            Add char
        </Text>
    )
}

export { BattleMap }