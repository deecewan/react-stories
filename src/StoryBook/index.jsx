/* @flow */

import React, { Component, type Element } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../internal/Sidebar';
import type { TreeType } from '../types.js.flow';
import * as style from './style';

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
  selectionType: 'chapter' | 'story',
  sidebarOpen: boolean,
  tree: TreeType,
};

export default class StoryBook extends Component {

  props: PropsType;
  state: StateType;
  setSelected: (Array<number>) => void;
  toggleSidebar: () => void;

  constructor(props: PropsType) {
    super(props);

    const tree = [].concat(this.props.children).map(child => getChildTree(child));

    this.state = {
      tree, // store in state for easier access later
      currentSelection: [],
      selectionType: 'chapter', // TODO: decide the correct initial value
      sidebarOpen: true,
    };

    this.setSelected = this.setSelected.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  getChildContext() {
    return {
      setSelected: this.setSelected,
      selected: this.state.currentSelection,
    };
  }

  setSelected(path: Array<number>, type: 'chapter' | 'story') {
    this.setState({ currentSelection: path, selectionType: type });
  }

  toggleSidebar() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  getSelected() {
    if (this.state.currentSelection.length === 0 || this.state.selectionType !== 'story') {
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

  getSidebar() {
    if (!this.state.sidebarOpen) {
      return null;
    }

    return (
      <div style={style.sidebarWrapper}>
        <Sidebar setSelected={this.setSelected} tree={this.state.tree} />
      </div>
    );
  }

  getName() {
    const remaining = [].concat(this.state.currentSelection);
    if (remaining.length === 0) {
      return 'Select an item';
    }

    let tree = this.state.tree;
    const words = [];

    while (remaining.length > 0) {
      const position = remaining.shift();
      const branch = tree[position];
      if (typeof branch === 'string') {
        words.push(branch);
      } else {
        words.push(branch[0]);
      }
      tree = branch[1];
    }

    if (this.state.selectionType === 'chapter') {
      words.push('...');
    }

    return words.join(' → ');
  }

  render() {
    return (
      <div style={style.outer}>
        <div style={style.header}>
          <button style={style.button} onClick={this.toggleSidebar} type="button">
            {this.state.sidebarOpen ? 'Close' : 'Open'} Sidebar
          </button>
          <div style={style.titleWrapper}>
            <h4>{this.getName()}</h4>
          </div>
        </div>
        <div style={style.body}>
          {this.getSidebar()}
          <div style={style.content}>
            <div className="content">
              {this.getSelected()}
            </div>
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
