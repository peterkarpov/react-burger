// types/index.ts
import thunk, { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, applyMiddleware, createStore } from 'redux';

import { socketMiddlewareList } from '../../services/middleware';
import { TAythDispatchType } from '../../services/actions/auth';
import { TBasicDispatchType } from '../../services/actions/basic';
import { TWsConnectionDispatchType, TWsFeedConnectionDispatchType } from '../../services/actions/wsActionTypes';
import { rootReducer } from '../../services/reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk, ...socketMiddlewareList()));

export type RootState = ReturnType<typeof store.getState>;
export type LocationExtention = { from: { pathname: string } };

// Типизация всех экшенов приложения
type TApplicationActions = | TAythDispatchType | TBasicDispatchType | TWsConnectionDispatchType | TWsFeedConnectionDispatchType;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
