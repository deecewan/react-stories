/* @flow */

import { createStore, combineReducers } from 'redux';
import terminalReducer from './terminal';

const reducer = combineReducers({
  terminal: terminalReducer,
});

const store = createStore(reducer);

export default store;
