/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarStory from './SidebarStory';
import { getIndent, isSame } from './util';
import type { TreeType } from '../../types.js.flow';

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

type StateType = {
  open: boolean,
};

type ContextType = {
  selected: Array<number>,
};

export default class SidebarChapter extends Component {
  props: PropsType;
  state: StateType;
  handleClick: () => void;

  constructor(props: PropsType, context: ContextType) {
    super(props, context);

    this.state = { open: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: SyntheticEvent) {
    e.stopPropagation();
    this.setState({ open: !this.state.open });
  }

  getChildren() {
    if (!this.state.open) {
      return null;
    }

    return (
      <div>
        {renderStories(this.props.stories, this.props.path)}
      </div>
    );
  }

  render() {
    const thisPathLength = this.props.path.length;
    const selectedSubset = this.context.selected.slice(0, thisPathLength);
    const isSelected = isSame(this.props.path, selectedSubset);
    return (
      <div style={{ marginLeft: getIndent(this.props.path) }}>
        <h4 onClick={this.handleClick}>{this.props.name}{isSelected ? '→' : null}</h4>
        {this.getChildren()}
      </div>
    );
  }
}

SidebarChapter.contextTypes = {
  selected: PropTypes.arrayOf(PropTypes.number),
};
