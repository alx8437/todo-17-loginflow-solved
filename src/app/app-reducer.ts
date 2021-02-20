import {Dispatch} from "redux";
import {authApi} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AuthActionsType, setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/IS-INITIALIZED":
            return  {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}

export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType,
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null,
    isInitialized: boolean,
}

export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status:  RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({ type: 'APP/IS-INITIALIZED', isInitialized} as const)


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

export const initializeAppTC = () => async (dispatch: Dispatch<AppActionsType | AuthActionsType>) => {
     try {
         const result = await authApi.me();
         if (result.data.resultCode === 0) {
             dispatch(setIsLoggedInAC(true))
         } else {
             handleServerAppError(result.data, dispatch)
         }
         dispatch(setIsInitializedAC(true))
     } catch (e) {
         handleServerNetworkError(e.message, dispatch)
     }
}


    type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetIsInitializedActionType