/* @flow */

import arrayEqual from 'array-equal';

export function getIndent(path: Array<*>) {
  // start off at 0 indent
  const indentationCount = path.length - 1;
  return indentationCount * 15;
}

export const isSame = (...args: Array<Array<*>>) => arrayEqual(...args);
