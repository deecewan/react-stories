/* @flow */

import {
  addToTerminal,
  clearTab,
} from './actions';
import r from './';

describe('terminal', () => {
  describe('reducer', () => {
    describe('#addToTerminal', () => {
      it('should add a new tab', () => {
        const initialState = {};
        const action = addToTerminal('test', 1);
        const res = r(initialState, action);
        expect(res).toEqual({
          test: [1],
        });
      });

      it('should add to an existing tab', () => {
        const initialState = {
          test: [1],
        };
        const action = addToTerminal('test', 'text');
        const res = r(initialState, action);
        expect(res).toEqual({
          test: [1, 'text'],
        });
      });

      it('should handle multiple tabs', () => {
        const initialState = {
          test: [1, 'text'],
        };
        const action = addToTerminal('test1', 'first item');
        const res = r(initialState, action);
        expect(res).toEqual({
          test: [1, 'text'],
          test1: ['first item'],
        });
      });
    });

    describe('#clearTab', () => {
      it('should clear a terminal', () => {
        const initialState = { test: [1, 2, 3, 4, 5] };
        const action = clearTab('test');
        const res = r(initialState, action);
        expect(res).toEqual({ test: [] });
      });

      it('should work if already empty', () => {
        const initialState = { test: [] };
        const action = clearTab('test');
        const res = r(initialState, action);
        expect(res).toEqual({ test: [] });
      });

      it('should work with multiple reducers', () => {
        const initialState = {
          test: [1, 2, 3],
          next: ['four', 'five', 'six'],
        };
        const action = clearTab('next');
        const res = r(initialState, action);
        expect(res).toEqual({
          test: [1, 2, 3],
          next: [],
        });
      });
    });

    describe('default', () => {
      it('should return the state for an unrecognized action', () => {
        const initialState = { test: [1, 2, 3] };
        // $ExpectError
        const res = r(initialState, { type: 'unknown action' });
        expect(res).toEqual(initialState);
      });
    });

    test('returns empty object as initial state', () => {
      // $ExpectError
      const res = r(undefined, { type: 'unknown action ' });
      expect(res).toEqual({});
    });
  });
});
