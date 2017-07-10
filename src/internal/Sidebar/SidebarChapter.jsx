/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarStory from './SidebarStory';
import { getIndent, isSame } from './util';
import type { TreeType } from '../../types.js.flow';
import * as style from './style';

function renderStories(stories: TreeType, path: Array<number>) {
  return stories.map((child, i) => {
    const nextPath = path.concat(i);
    if (typeof child === 'string') {
      return <SidebarStory key={child} desc={child} path={nextPath} />;
    }
    if (typeof child[0] === 'string' && typeof child[1] !== 'string') {
      return <SidebarChapter key={child[0]} name={child[0]} stories={child[1]} path={nextPath} />;
    }
    return null;
  });
}

type PropsType = {
  name: string,
  path: Array<number>,
  stories: TreeType,
};

type ContextType = {
  selected: Array<number>,
  setSelected: (Array<number>, 'chapter') => void,
};

export default class SidebarChapter extends Component {
  context: ContextType;
  props: PropsType;
  handleClick: () => void;

  constructor(props: PropsType, context: ContextType) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: SyntheticEvent) {
    e.stopPropagation();
    this.context.setSelected(this.props.path, 'chapter');
  }

  getChildren(selected: boolean) {
    if (!selected) {
      return null;
    }

    return (
      <div>
        {renderStories(this.props.stories, this.props.path)}
      </div>
    );
  }

  getSelectedState() {
    const thisPathLength = this.props.path.length;
    const selectedSubset = this.context.selected.slice(0, thisPathLength);
    return isSame(this.props.path, selectedSubset);
  }

  render() {
    const selectedState = this.getSelectedState();
    return (
      <div style={{ marginLeft: getIndent(this.props.path) }}>
        <p
          style={style.chapterTitle(selectedState)}
          onClick={this.handleClick}
        >
          {this.props.name}
        </p>
        {this.getChildren(selectedState)}
      </div>
    );
  }
}

SidebarChapter.contextTypes = {
  selected: PropTypes.arrayOf(PropTypes.number),
  setSelected: PropTypes.func,
};
