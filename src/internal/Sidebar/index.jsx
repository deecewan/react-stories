/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isSame from 'array-equal';

function renderStories(stories, path, setSelected) {
  return stories.map((child, i) => {
    const nextPath = path.concat(i);
    if (typeof child === 'string') {
      return <SidebarStory key={child} desc={child} path={nextPath} />;
    }
    return <SidebarChapter key={child[0]} name={child[0]} stories={child[1]} path={nextPath} />;
  });
}

function getIndent(path) {
  // start off at 0 indent
  const indentationCount = path.length - 1;
  return indentationCount * 15;
}

class SidebarChapter extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { open: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
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
      <div style={{marginLeft: getIndent(this.props.path)}}>
        <h4 onClick={this.handleClick}>{this.props.name}{isSelected ? '→': null}</h4>
        {this.getChildren()}
      </div>
    );
  }
}

SidebarChapter.contextTypes = {
  selected: PropTypes.arrayOf(PropTypes.number),
};

function SidebarStory(props, context) {
  const isCurrentStory = isSame(props.path, context.selected);
  return (
    <div
      style={{marginLeft: getIndent(props.path)}}
      onClick={() => context.setSelected(props.path)}
    >
      {isCurrentStory ? '→ ' : null}
      {props.desc}
    </div>
  );
}

SidebarStory.contextTypes = {
  setSelected: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.number),
}

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = { open: true };
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const tree = this.props.tree;
    return (
      <div className="sidebar">
        {tree.map((branch, i) =>
          <SidebarChapter
            key={branch[0]}
            name={branch[0]}
            stories={branch[1]}
            path={[i]}
          />
        )}
      </div>
    );
  }
}
