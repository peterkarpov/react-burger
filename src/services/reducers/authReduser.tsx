import { SET_USER_REQUEST, TAythDispatchType } from "../actions/auth";

export interface IInitialStateAuth {
    user: {
        email: string
    } | null,
    id: string | null
}

const initialStateAuth: IInitialStateAuth = {
    user: null,
    id: null
}

export const authReduser = (state: IInitialStateAuth = initialStateAuth, action: TAythDispatchType) : IInitialStateAuth => {
    switch (action.type) {
        case SET_USER_REQUEST: {
            return {
                ...state,
                user: action.user,
                id: action.user?.email || null
            };
        }
        default: {
            return state;
        }
    }
}