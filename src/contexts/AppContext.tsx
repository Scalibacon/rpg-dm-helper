import appReducer, { AppReducerAction, AppState, initialState } from "@/reducers/AppReducer";
import { Dispatch, createContext, useReducer } from "react";

interface AppContextValue {
    appState: AppState
    appDispatch: Dispatch<AppReducerAction>
}

const AppContext = createContext<AppContextValue>({
    appDispatch: () => null,
    appState: {
        chars: []
    }
})

const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    return (
        <AppContext.Provider value={{ appState: state, appDispatch: dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
export { AppContext }

