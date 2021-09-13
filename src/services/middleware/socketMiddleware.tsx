import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from '../actions/wsActionTypes';
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_ERROR, WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_MESSAGE, WS_FEED_SEND_MESSAGE } from '../actions/wsActionTypes';

import { getCookie } from "../utils";

export const socketMiddlewareList = () => {

  const feedUrl = 'wss://norma.nomoreparties.space/orders/all';
  const profileOrdersUrl = 'wss://norma.nomoreparties.space/orders';

  const wsFeedActions = {
    wsInit: WS_FEED_CONNECTION_START,
    wsSendMessage: WS_FEED_SEND_MESSAGE,
    onOpen: WS_FEED_CONNECTION_SUCCESS,
    onClose: WS_FEED_CONNECTION_CLOSED,
    onError: WS_FEED_CONNECTION_ERROR,
    onMessage: WS_FEED_GET_MESSAGE
  };

  const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
  };

  return [socketMiddleware(feedUrl, wsFeedActions, false), socketMiddleware(profileOrdersUrl, wsActions, true)];
}

export const socketMiddleware = (wsUrl: string, wsActions: any, isNeedToken: boolean) => {
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
        socket.onopen = (event: any) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: any) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: any) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event: any) => {
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
