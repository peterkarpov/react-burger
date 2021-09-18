import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import IDataItem from "../../utils/Interfaces/IDataItem";
import { DELETE_ID_FOR_POPUP, SET_DATA_REQUEST, SET_ID_FOR_POPUP, SET_ORDER_DATA, SET_ORDER_STATUS, SET_SELECTED_INGREDIENTS } from "../actions/basic";
import { basicReducer } from "./basicReducer";

const initialState = {
    data: Array.from<IDataItem>([]),
    selectedIngredientsId: Array.from<string>([]),
    idForPopup: null,
    orderInfo: null,
    orderStatus: null
};

const compareState = {
    data: [{
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        __v: 0,
        _id: "60d3b41abdacab0026a733c6"
    },
    {
        calories: 643,
        carbohydrates: 85,
        fat: 26,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        name: "Флюоресцентная булка R2-D3",
        price: 988,
        proteins: 44,
        type: "bun",
        __v: 0,
        _id: "60d3b41abdacab0026a733c7"
    }],
    selectedIngredientsId: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c7"],
    idForPopup: "60d3b41abdacab0026a733c6",
    orderInfo: {
        orderNumber: 1234,
        selectedIngredientsId: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c7"],
        total: 1234,
    },
    orderStatus: 'ERROR' as ('ERROR' | 'IN_PROGRESS' | null)
}

describe('Проверка basicReducer', () => {

    const enhancer = applyMiddleware(thunk);
    const store = createStore(basicReducer, enhancer);

    it(`Диспатчим ${SET_DATA_REQUEST} и сравниваем с желаемым стейтом`, async () => {

        const { getState } = store

        expect(getState()).toStrictEqual(initialState)

        store.dispatch({
            type: SET_DATA_REQUEST,
            data: Array.from<IDataItem>(compareState.data)
        });

        expect(getState()).toStrictEqual({ ...initialState, data: compareState.data })
    });

    it(`Диспатчим ${SET_SELECTED_INGREDIENTS} и сравниваем с желаемым стейтом`, async () => {

        const { getState } = store

        store.dispatch({
            type: SET_SELECTED_INGREDIENTS,
            selectedIngredientsId: compareState.selectedIngredientsId
        });

        expect(getState()).toStrictEqual({ ...getState(), selectedIngredientsId: compareState.selectedIngredientsId })
    });

    it(`Диспатчим ${SET_ORDER_DATA} и сравниваем с желаемым стейтом`, async () => {

        const { getState } = store

        store.dispatch({
            type: SET_ORDER_DATA,
            orderData: compareState.orderInfo
        });

        expect(getState()).toStrictEqual({ ...getState(), orderInfo: compareState.orderInfo })
    });

    it(`Диспатчим ${SET_ID_FOR_POPUP} и сравниваем с желаемым стейтом`, async () => {

        const { getState } = store

        store.dispatch({
            type: SET_ID_FOR_POPUP,
            idForPopup: compareState.idForPopup
        });

        expect(getState()).toStrictEqual({ ...getState(), idForPopup: compareState.idForPopup })
    });

    it(`Диспатчим ${DELETE_ID_FOR_POPUP} и сравниваем с желаемым стейтом`, async () => {

        const { getState } = store

        store.dispatch({
            type: DELETE_ID_FOR_POPUP,
            idForPopup: null
        });

        expect(getState()).toStrictEqual({ ...getState(), idForPopup: null })
    });

    it(`Диспатчим ${SET_ORDER_STATUS} и сравниваем с желаемым стейтом`, async () => {

        const { getState } = store

        store.dispatch({
            type: SET_ORDER_STATUS,
            status: compareState.orderStatus
        });

        expect(getState()).toStrictEqual({ ...getState(), orderStatus: compareState.orderStatus })
    });

})