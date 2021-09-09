import { combineReducers } from 'redux';

import { authReduser } from './authReduser';
import { basicReducer } from './basicReducer';
import { wsFeedReducer } from './wsFeedReducer';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
    basic: basicReducer,
    auth: authReduser,
    profileOrders: wsReducer,
    feed: wsFeedReducer
});
