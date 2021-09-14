import IBasicState from '../../utils/Interfaces/IBasicState';
import IDataItem from '../../utils/Interfaces/IDataItem';

import { 
    SET_DATA_REQUEST, 
    SET_SELECTED_INGREDIENTS, 
    SET_ORDER_DATA, 
    SET_ID_FOR_POPUP, 
    DELETE_ID_FOR_POPUP,
    SET_ORDER_STATUS
} from '../actions/basic';

const initialState: IBasicState = {
    data: Array.from<IDataItem>([]),
    selectedIngredientsId: Array.from<string>([]),
    idForPopup: null,
    orderInfo: null,
    orderStatus: null
};

export const basicReducer = (state = initialState, action: any): IBasicState => {
    switch (action.type) {
        case SET_DATA_REQUEST: {
            return {
                ...state,
                data: Array.from<IDataItem>(action.data)
            };
        }
        case SET_SELECTED_INGREDIENTS: {
            return {
                ...state,
                selectedIngredientsId: action.selectedIngredientsId
            };
        }
        case SET_ORDER_DATA: {
            return {
                ...state,
                orderInfo: action.orderData
            };
        }
        case SET_ID_FOR_POPUP: {
            return {
                ...state,
                idForPopup: action.idForPopup
            };
        }
        case DELETE_ID_FOR_POPUP: {
            return {
                ...state,
                idForPopup: null
            };
        }
        case SET_ORDER_STATUS: {
            return {
                ...state,
                orderStatus: action.status
            };
        }
        default: {
            return state;
        }
    }
};