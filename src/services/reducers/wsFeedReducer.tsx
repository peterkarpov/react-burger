import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  TWsFeedConnectionDispatchType
} from '../actions/wsActionTypes';

export interface IInitialState {
  wsConnected: boolean,
  orders: any[],
  total: number | null,
  totalToday: number | null
}

const initialState: IInitialState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null
};

export const wsFeedReducer = (state: IInitialState = initialState, action: TWsFeedConnectionDispatchType): IInitialState => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_FEED_GET_MESSAGE:

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
