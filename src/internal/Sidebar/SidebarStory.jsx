/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import { getIndent, isSame } from './util';
import * as style from './style';

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
      <p style={style.storyTitle(isCurrentStory)}>{props.desc}</p>
    </div>
  );
}

SidebarStory.contextTypes = {
  setSelected: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.number),
};
