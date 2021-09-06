import { combineReducers } from 'redux';

import { authReduser } from './authReduser';
import { basicReducer } from './basicReducer';

export const rootReducer = combineReducers({
    basic: basicReducer,
    auth: authReduser
});
