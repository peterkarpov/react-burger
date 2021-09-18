import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { RootState } from "../../utils/types";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../actions/wsActionTypes";
import { IWsOrder, wsReducer } from "./wsReducer";


const initialState = {
    wsConnected: false,
    orders: [],
    total: null,
    totalToday: null
};

const compareState = {
    wsConnected: false,
    orders: Array.from<IWsOrder>([
        {
            ingredients: ["1", "2"],
            _id: "3",
            status: 'created' as 'created' | 'pending' | 'done',
            number: 1,
            createdAt: "string",
            updatedAt: "string",
            name: "string"
        },
        {
            ingredients: ["4", "5"],
            _id: "6",
            status: 'created' as 'created' | 'pending' | 'done',
            number: 1,
            createdAt: "string",
            updatedAt: "string",
        }
    ]),
    total: 1,
    totalToday: 1
}

describe('Проверка wsReducer', () => {

    const enhancer = applyMiddleware(thunk);
    const store = createStore(wsReducer, enhancer);

    it(`Диспатчим ${WS_CONNECTION_SUCCESS} и сравниваем с желаемым стейтом`, async () => {

        const { getState } = store

        expect(getState()).toStrictEqual(initialState)

        store.dispatch({
            type: WS_CONNECTION_SUCCESS,
            wsConnected: true
        });

        expect(getState()).toStrictEqual({ ...getState(), wsConnected: true })
    });

    it(`Диспатчим ${WS_CONNECTION_ERROR} и сравниваем с желаемым стейтом`, async () => {

        const { getState } = store

        store.dispatch({
            type: WS_CONNECTION_ERROR,
            wsConnected: false
        });

        expect(getState()).toStrictEqual({ ...getState(), wsConnected: false })
    });

    it(`Диспатчим ${WS_CONNECTION_CLOSED} и сравниваем с желаемым стейтом`, async () => {

        const { getState } = store

        store.dispatch({
            type: WS_CONNECTION_CLOSED,
            wsConnected: false
        });

        expect(getState()).toStrictEqual({ ...getState(), wsConnected: false })
    });

    it(`Диспатчим ${WS_GET_MESSAGE} и сравниваем с желаемым стейтом`, async () => {

        const { getState } = store

        store.dispatch({
            type: WS_GET_MESSAGE,
            payload: compareState
        });

        expect(getState()).toStrictEqual(compareState)
    });

})