/* @flow */

import { combineReducers, type Reducer } from 'redux';
import store from './store';
import terminalReducer from './store/terminal';

export const reducers = {};

function replaceReducer() {
  const nextReducer = combineReducers({
    ...reducers,
    terminal: terminalReducer,
  });
  store.replaceReducer(nextReducer);
}

export default function registerReducer(reducer: Reducer<*, *>): void {
  reducers[reducer.name] = reducer;
  replaceReducer();
}

