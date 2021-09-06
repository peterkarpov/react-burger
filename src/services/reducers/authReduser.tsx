import { SET_USER_REQUEST } from "../actions/auth";

const initialStateAuth = {
    user: null,
    id: null
}

export const authReduser = (state = initialStateAuth, action: any) => {
    switch (action.type) {
        case SET_USER_REQUEST: {
            return {
                ...state,
                user: action.user,
                id: action.user?.email
            };
        }
        default: {
            return state;
        }
    }
}