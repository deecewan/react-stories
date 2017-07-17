/* @flow */

import React, { type Element } from 'react';
import { tab as style } from './style';

type PropsType = {
  children?: Element<*>,
  name: string,
};

export default function Tab(props: PropsType) {
  return (
    <div>
      <b>{props.name}</b>
      {props.children}
    </div>
  );
}

Tab.defaultProps = {
  children: null,
};
