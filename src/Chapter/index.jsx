/* @flow */

// import type { Children } from 'react';
import React, { type Children } from 'react';

type PropsType = {
  children: Children,
  for: string,
};

export default function Chapter(props: PropsType) {
  return (
    <div>
      <div>Chapter {props.for}</div>
      <div>Children: {props.children}</div>
    </div>
  );
}
