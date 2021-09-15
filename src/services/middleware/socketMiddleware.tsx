import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from '../actions/wsActionTypes';
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_ERROR, WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_MESSAGE, WS_FEED_SEND_MESSAGE } from '../actions/wsActionTypes';

import { getCookie } from "../utils";

export const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE
};

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const socketMiddlewareList = () => {

  const feedUrl = 'wss://norma.nomoreparties.space/orders/all';
  const profileOrdersUrl = 'wss://norma.nomoreparties.space/orders';

  return [socketMiddleware(feedUrl, wsFeedActions, false), socketMiddleware(profileOrdersUrl, wsActions, true)];
}

export type IWsActions = typeof wsFeedActions | typeof wsActions;

export const socketMiddleware = (wsUrl: string, wsActions: IWsActions, isNeedToken: boolean) => {
  return ((store: any) => {
    let socket: any = null;

    return ((next: any) => (action: any) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

      const token = getCookie('token');

      if (isNeedToken) {
        if (type === wsInit && token) {
          socket = new WebSocket(`${wsUrl}?token=${token}`);
        }
      } else {
        if (type === wsInit) {
          socket = new WebSocket(`${wsUrl}`);
        }
      }

      if (socket) {
        socket.onopen = (event: WebSocketEventMap) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: WebSocketEventMap) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: WebSocketEventMap & { data: string }) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event: WebSocketEventMap) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload, token: token };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    });
  });
};
