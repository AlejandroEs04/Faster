import { Link } from '../types'

export type AppActions = 
    { type: 'change-routes', payload: { routes: Link[] } }

export type AppState = {
    routes: Link[]
}

export const initialState : AppState = {
    routes: [
        {
            name: 'Overview', 
            url: '/'
        }
    ]
}

export const AppReducer = (
    state: AppState = initialState, 
    actions: AppActions
) => {
    if(actions.type === 'change-routes') {
        return {
            ...state, 
            routes: actions.payload.routes
        }
    }

    return state
}