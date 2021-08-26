import IDataItem from '../../utils/Interfaces/IDataItem';

import { 
    SET_DATA_REQUEST, 
    SET_SELECTED_INGREDIENTS, 
    SET_ORDER_DATA, 
    SET_ID_FOR_POPUP, 
    DELETE_ID_FOR_POPUP 
} from '../actions/basic';

const initialState = {
    data: Array.from<IDataItem>([]),
    selectedIngredientsId: Array.from<string>([]),
    idForPopup: null,
    orderInfo: null
};

export const basicReducer = (state = initialState, action: any) => {
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
        default: {
            return state;
        }
    }
};