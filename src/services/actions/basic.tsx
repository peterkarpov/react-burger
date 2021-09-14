import { getDataRequest, getOrderRequest, setOrderInfoRequest } from '../api';
import IDataItem from '../../utils/Interfaces/IDataItem';
import { TOrderInfo } from '../../utils/Interfaces/IBasicState';
import { Dispatch } from 'redux';

export const SET_DATA_REQUEST: 'SET_DATA_REQUEST' = 'SET_DATA_REQUEST';
export const SET_SELECTED_INGREDIENTS: 'SET_SELECTED_INGREDIENTS' = 'SET_SELECTED_INGREDIENTS';
export const SET_ID_FOR_POPUP: 'SET_ID_FOR_POPUP' = 'SET_ID_FOR_POPUP';
export const DELETE_ID_FOR_POPUP: 'DELETE_ID_FOR_POPUP' = 'DELETE_ID_FOR_POPUP';
export const SET_ORDER_DATA: 'SET_ORDER_DATA' = 'SET_ORDER_DATA';
export const SET_ORDER_STATUS: 'SET_ORDER_STATUS' = 'SET_ORDER_STATUS';

export type TBasicActionsType =
    typeof SET_DATA_REQUEST |
    typeof SET_SELECTED_INGREDIENTS |
    typeof SET_ID_FOR_POPUP |
    typeof DELETE_ID_FOR_POPUP |
    typeof SET_ORDER_DATA |
    typeof SET_ORDER_STATUS;

export interface TBasicDispatchType {
    readonly type: TBasicActionsType;
    readonly id?: number;
    readonly data?: IDataItem[];
    readonly orderData?: TOrderInfo | void | undefined;
    readonly status?: string | null;
}

export function actionInitData() {

    return function (dispatch: Dispatch<TBasicDispatchType>) {

        getDataRequest()
            .then(data => {

                dispatch({
                    type: SET_DATA_REQUEST,
                    data: Array.from<IDataItem>(data)
                });

                //// demo
                // const defaultSelectedIngredientsId = Array.from<string>([]);
                // let defaultBunIngredientId = data.filter((v: IDataItem) => { return v.type === 'bun' }).sort(() => Math.random() - 0.5).find(() => { return true })?._id;

                // defaultSelectedIngredientsId.push(defaultBunIngredientId);
                // defaultSelectedIngredientsId.push(defaultBunIngredientId);

                // defaultSelectedIngredientsId.push(data.filter((v: IDataItem) => { return v.type !== 'bun' }).sort(() => Math.random() - 0.5).find(() => { return true })?._id);
                // defaultSelectedIngredientsId.push(data.filter((v: IDataItem) => { return v.type !== 'bun' }).sort(() => Math.random() - 0.5).find(() => { return true })?._id);
                // defaultSelectedIngredientsId.push(data.filter((v: IDataItem) => { return v.type !== 'bun' }).sort(() => Math.random() - 0.5).find(() => { return true })?._id);

                // dispatch({
                //     type: SET_SELECTED_INGREDIENTS,
                //     selectedIngredientsId: defaultSelectedIngredientsId
                // });
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function actionSetOrderInfo(orderData: TOrderInfo) {

    return function (dispatch: Dispatch<TBasicDispatchType>) {

        setOrderInfoRequest(orderData)
            .then(orderData => {

                dispatch({
                    type: SET_ORDER_DATA,
                    orderData: orderData
                });

            })
            .then(() => {

                dispatch({
                    type: SET_ORDER_STATUS,
                    status: null
                });

            })
            .catch((error) => {

                dispatch({
                    type: SET_ORDER_STATUS,
                    status: "ERROR"
                });

                console.log(error);
            })

    }
}

export function actionGetOrder(orderNumber: number) {

    return function (dispatch: Dispatch) {

        return getOrderRequest(orderNumber)
            .then(orders => {

                return orders;
            });

    }
}