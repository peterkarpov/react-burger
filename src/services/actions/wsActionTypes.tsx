export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export const WS_FEED_CONNECTION_START: 'WS_FEED_CONNECTION_START' = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_SUCCESS: 'WS_FEED_CONNECTION_SUCCESS' = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED_CONNECTION_ERROR' = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED_CONNECTION_CLOSED' = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE: 'WS_FEED_GET_MESSAGE' = 'WS_FEED_GET_MESSAGE';
export const WS_FEED_SEND_MESSAGE: 'WS_FEED_SEND_MESSAGE' = 'WS_FEED_SEND_MESSAGE';

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly wsConnected: boolean;
}

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly wsConnected: boolean;
}

export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly wsConnected: boolean;
}

export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly wsConnected: boolean;
}

export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: { total: number, totalToday: number, orders: Array<string> };
}

export type TWsConnectionDispatchType = | IWsConnectionStart | IWsConnectionSuccess | IWsConnectionError | IWsConnectionClosed | IWsGetMessage;

export interface IWsFeedConnectionStart {
    readonly type: typeof WS_FEED_CONNECTION_START;
    readonly wsConnected: boolean;
}

export interface IWsFeedConnectionSuccess {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
    readonly wsConnected: boolean;
}

export interface IWsFeedConnectionError {
    readonly type: typeof WS_FEED_CONNECTION_ERROR;
    readonly wsConnected: boolean;
}

export interface IWsFeedConnectionClosed {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED;
    readonly wsConnected: boolean;
}

export interface IWsFeedGetMessage {
    readonly type: typeof WS_FEED_GET_MESSAGE;
    readonly payload: { total: number, totalToday: number, orders: Array<string> };
}

export type TWsFeedConnectionDispatchType = | IWsFeedConnectionStart | IWsFeedConnectionSuccess | IWsFeedConnectionError | IWsFeedConnectionClosed | IWsFeedGetMessage;
