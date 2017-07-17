/* @flow */

import type { ActionType, StateType } from './types';

export const initialState: StateType = {};

export default function reducer(
  state: StateType = initialState,
  action: ActionType,
): StateType {
  switch (action.type) {
    case '@@stories/ADD_TO_TERMINAL':
      return {
        ...state,
        [action.payload.tabName]: []
            .concat(state[action.payload.tabName] || [])
            .concat(action.payload.data),
      };
    case '@@stories/CLEAR_TAB':
      return {
        ...state,
        [action.payload]: [],
      };
    default:
      return state;
  }
}
