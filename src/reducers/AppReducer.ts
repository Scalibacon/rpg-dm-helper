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

export const initialState: AppState = {
    chars: [],
}

// [to-do] save state in local storage or somewhere else
const appReducer = (state: AppState, action: AppReducerAction): AppState => {
    const { type, payload } = action

    return produce(state, (draft) => {
        switch (type) {
            case AppActionKind.ADD_CHAR:
                draft.chars.push(payload.char)
                break;
        }
    })
}

export default appReducer