/* @flow */

import React, { Component, type Element } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../internal/Sidebar';
import type { TreeType } from '../types.js.flow';

function getChildTree(child) {
  if (child.props.desc) {
    return child.props.desc;
  }
  if (child.props.for) {
    return [child.props.for, [].concat(child.props.children).map(c => getChildTree(c))];
  }
  throw new Error(`Could not build tree for child: ${child.toString()}`);
}

type PropsType = {
  children: Element<*>,
};

type StateType = {
  currentSelection: Array<number>,
  tree: TreeType,
};

export default class StoryBook extends Component {

  props: PropsType;
  state: StateType;
  setSelected: (Array<number>) => void;

  constructor(props: PropsType) {
    super(props);

    const tree = [].concat(this.props.children).map(child => getChildTree(child));

    this.state = {
      tree, // store in state for easier access later
      currentSelection: [],
    };

    this.setSelected = this.setSelected.bind(this);
  }

  getChildContext() {
    return {
      setSelected: this.setSelected,
      selected: this.state.currentSelection,
    };
  }

  setSelected(path: Array<number>) {
    this.setState({ currentSelection: path });
  }

  getSelected() {
    if (this.state.currentSelection.length === 0) {
      return null;
    }
    const remaining = [].concat(this.state.currentSelection); // clone the array
    let selected = this;
    while (remaining.length > 0) {
      const item = remaining.shift();
      selected = [].concat(selected.props.children)[item];
    }
    return selected;
  }


  getName() {
    const remaining = [].concat(this.state.currentSelection);
    let tree = this.state.tree;
    const words = [];

    while (remaining.length > 1) {
      const position = remaining.shift();
      const branch = tree[position];
      words.push(branch[0]);
      tree = branch[1];
    }
    words.push(tree[remaining[0]]);

    return words.join(' → ');
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%' }}>
          <Sidebar setSelected={this.setSelected} tree={this.state.tree} />
        </div>
        <div>
          <h4>Selected: {this.getName()}</h4>
          <div className="content">
            {this.getSelected()}
          </div>
        </div>
      </div>
    );
  }
}

StoryBook.childContextTypes = {
  setSelected: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.number),
};
