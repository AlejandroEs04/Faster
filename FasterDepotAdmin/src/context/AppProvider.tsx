import { createContext, Dispatch, ReactNode, useReducer } from "react"
import { AppActions, AppReducer, AppState, initialState } from "../reducers/app-reducer"

type AppContextProps = {
    state: AppState, 
    dispatch: Dispatch<AppActions>
}

type AppProviderProps = {
    children: ReactNode
}

export const AppContext = createContext<AppContextProps>(null!)

export const AppProvider = ({children} : AppProviderProps) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    return (
        <AppContext.Provider
            value={{
                state, 
                dispatch
            }}
        >
            {children}
        </AppContext.Provider>
    )
}