import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { SET_USER_REQUEST } from "../actions/auth";
import { authReduser } from "./authReduser";

const initialState = {
    user: null,
    id: null
}

const compareState = {
    user: { name: "test name", email: "test@mail.ru" },
    id: "test@mail.ru"
}

describe('Проверка authReduser', () => {

    const enhancer = applyMiddleware(thunk);
    const store = createStore(authReduser, enhancer);

    it('Диспатчим SET_USER_REQUEST и сравниваем с желаемым стейтом', async () => {

        const { getState } = store

        expect(getState()).toStrictEqual(initialState)

        store.dispatch({
            type: SET_USER_REQUEST,
            user: compareState.user
        });

        expect(getState()).toStrictEqual(compareState)
    })

})