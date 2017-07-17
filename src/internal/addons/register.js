/* @flow */

import type { Element } from 'react';

export default function registerAddon(
  registerTo: { [string]: () => Element<*> } = {},
  name: string,
  componentCreator: () => Element<*>,
) {
  return {
    ...registerTo,
    [name]: componentCreator,
  };
}
