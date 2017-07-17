/* @flow */

import type { Element } from 'react';
import register from './register';

export type ComponentsType = { [string]: () => Element<*> };
type HandlerType = (ComponentsType) => void;

let components: ComponentsType = {};
let subscribers: Array<HandlerType> = [];

function notify() {
  subscribers.forEach(sub => sub(components));
}

function remove(handler) {
  subscribers = subscribers.filter(sub => sub !== handler);
}

export function subscribe(handler: HandlerType) {
  const unsubscribe = () => remove(handler);

  subscribers.push(handler);
  return unsubscribe;
}

export default function registerAddon(
  name: string,
  componentCreator: () => Element<*>,
) {
  components = register(components, name, componentCreator);
  notify();
}

window.add = registerAddon;
