/* @flow */

import type { AddToTerminalActionType, ClearTabActionType } from './types';

export function addToTerminal(tabName: *, data: *): AddToTerminalActionType {
  return {
    type: '@@stories/ADD_TO_TERMINAL',
    payload: {
      tabName,
      data,
    },
  };
}

export function clearTab(tabName: string): ClearTabActionType {
  return {
    type: '@@stories/CLEAR_TAB',
    payload: tabName,
  };
}
