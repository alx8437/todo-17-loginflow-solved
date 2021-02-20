import { Dispatch } from 'redux'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'
import {authApi, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLogin}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLogin: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', isLogin} as const)

// thunks
export const loginTC = (payload: LoginParamsType) => async (dispatch: Dispatch<AuthActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const result = await authApi.login(payload);
        if (result.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e.message, dispatch)
    }
}

export const logoutTC = () => async (dispatch: Dispatch<AuthActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const result = await authApi.logout();
        if (result.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(result.data, dispatch)
        }

    } catch (e) {
        handleServerAppError(e.message, dispatch)
    }
}

// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
