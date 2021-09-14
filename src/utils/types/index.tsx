// types/index.ts
import thunk, { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, applyMiddleware, createStore } from 'redux';

import { basicReducer } from '../../services/reducers/basicReducer';
import { socketMiddlewareList } from '../../services/middleware';
import { TAythDispatchType } from '../../services/actions/auth';
import { TBasicDispatchType } from '../../services/actions/basic';

const store = createStore(basicReducer, applyMiddleware(thunk, ...socketMiddlewareList()));

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TAythDispatchType | TBasicDispatchType;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch; 