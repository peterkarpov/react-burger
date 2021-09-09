import React from 'react';
import ReactDOM from 'react-dom';
import '../src/css/index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/rootReducer';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from './services/actions/wsActionTypes';
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_ERROR, WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_MESSAGE, WS_FEED_SEND_MESSAGE } from './services/actions/wsActionTypes';

import { socketMiddleware } from './services/middleware';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__<any>({})
     : 
    compose;

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

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(feedUrl, wsFeedActions, false), socketMiddleware(profileOrdersUrl, wsActions, true)));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
