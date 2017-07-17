/* @flow */

/* pretty much anything serialisable - there might be a better way */
type SerialType = boolean | string | number;
export type DataType = SerialType | { [string]: SerialType };

export type AddToTerminalActionType = {
  payload: {
    data: DataType,
    tabName: string,
  },
  type: '@@stories/ADD_TO_TERMINAL',
};

export type ClearTabActionType = {
  payload: string,
  type: '@@stories/CLEAR_TAB',
};

export type ActionType = AddToTerminalActionType
  | ClearTabActionType
  ; /* new line for better diffs */

export type StateType = {
  +[tabName: string]: Array<DataType>,
};
