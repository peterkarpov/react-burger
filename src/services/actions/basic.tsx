import { getDataRequest, setOrderInfoRequest } from '../api';
import IDataItem from '../../utils/Interfaces/IDataItem';

export const SET_DATA_REQUEST = 'SET_DATA_REQUEST';

export const SET_SELECTED_INGREDIENTS = 'SET_SELECTED_INGREDIENTS';

export const SET_ID_FOR_POPUP = 'SET_ID_FOR_POPUP';

export const DELETE_ID_FOR_POPUP = 'DELETE_ID_FOR_POPUP';

export const GET_ORDER_DATA = 'GET_ORDER_DATA';

export function actionInitData() {

    return function (dispatch: any) {

        getDataRequest().then(data => {

            dispatch({
                type: SET_DATA_REQUEST,
                data: Array.from<IDataItem>(data)
            });

            const defaultSelectedIngredientsId = Array.from<string>([]);
            let defaultBunIngredientId = data.filter((v: IDataItem) => { return v.type === 'bun' }).sort(() => Math.random() - 0.5).find(() => { return true })?._id;

            defaultSelectedIngredientsId.push(defaultBunIngredientId);
            defaultSelectedIngredientsId.push(defaultBunIngredientId);

            defaultSelectedIngredientsId.push(data.filter((v: IDataItem) => { return v.type !== 'bun' }).sort(() => Math.random() - 0.5).find(() => { return true })?._id);
            defaultSelectedIngredientsId.push(data.filter((v: IDataItem) => { return v.type !== 'bun' }).sort(() => Math.random() - 0.5).find(() => { return true })?._id);
            defaultSelectedIngredientsId.push(data.filter((v: IDataItem) => { return v.type !== 'bun' }).sort(() => Math.random() - 0.5).find(() => { return true })?._id);

            dispatch({
                type: SET_SELECTED_INGREDIENTS,
                selectedIngredientsId: defaultSelectedIngredientsId
            });
        });
    };
}

export function actionSetOrderInfo(orderData: any) {

    return function (dispatch: any) {

        setOrderInfoRequest(orderData).then(orderData => {

            dispatch({
                type: GET_ORDER_DATA,
                orderData: orderData
            });

        })

    }
}