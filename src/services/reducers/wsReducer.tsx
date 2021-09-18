import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWsConnectionDispatchType
} from '../actions/wsActionTypes';

export interface IWsOrder {
  ingredients: string[],
  _id: string,
  status: 'created' | 'pending' | 'done'
  number: number,
  createdAt: string,
  updatedAt: string,
  name?: string
}

export interface IInitialState {
  wsConnected: boolean,
  orders: IWsOrder[],
  total: number | null,
  totalToday: number | null
}

const initialState: IInitialState = {
  wsConnected: false,
  orders: Array.from<IWsOrder>([]),
  total: null,
  totalToday: null
};

export const wsReducer = (state: IInitialState = initialState, action: TWsConnectionDispatchType) : IInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        orders: action.payload.orders
      };
    
    default:
      return state;
  }
};
