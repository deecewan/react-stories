/* @flow */

import React, { type Children } from 'react';

type PropsType = {
  children: Children,
};

export default function Story(props: PropsType) {
  return <div>{props.children}</div>;
}
