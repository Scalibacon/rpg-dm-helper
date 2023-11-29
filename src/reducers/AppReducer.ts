import { Char } from "@/types/Char.type"
import { produce } from "immer"

export enum AppActionKind {
    ADD_CHAR = 'ADD_CHAR',
    UPDATE_CHAR = 'UPDATE_CHAR',
    REMOVE_CHAR = 'REMOVE_CHAR',
}

export interface AppReducerAction {
    payload: {
        char: Char,
    },
    type: AppActionKind
}

export interface AppState {
    chars: Char[]
}

const saveStateInStorage = (state: AppState) => {
    const stateString = JSON.stringify(state)
    localStorage.setItem('appState', stateString)
}

const readStateFromStorage = () => {
    const stateString = localStorage.getItem('appState')
    const state = stateString ? JSON.parse(stateString) as AppState : undefined

    return state
}

export const initialState: AppState = readStateFromStorage() || {
    chars: [],
}

const appReducer = (state: AppState, action: AppReducerAction): AppState => {
    const { type, payload } = action

    return produce(state, (draft) => {
        switch (type) {
            case AppActionKind.ADD_CHAR:
                draft.chars.push(payload.char)
                saveStateInStorage(draft)
                break;
        }
    })
}

export default appReducer