/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import { getIndent, isSame } from './util';

type PropsType = {
  desc: string,
  path: Array<number>,
};

type ContextType = {
  selected: Array<number>,
  setSelected: (Array<number>, 'story') => void,
};

export default function SidebarStory(props: PropsType, context: ContextType) {
  const isCurrentStory = isSame(props.path, context.selected);
  return (
    <div
      style={{ marginLeft: getIndent(props.path) }}
      onClick={() => context.setSelected(props.path, 'story')}
    >
      {isCurrentStory ? '→ ' : null}
      {props.desc}
    </div>
  );
}

SidebarStory.contextTypes = {
  setSelected: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.number),
};
