/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../internal/Sidebar';

function getChildTree(child) {
  if (!child) {
    return;
  }
  if (child.props.desc) {
    return child.props.desc;
  }
  if (child.props.for) {
    return [child.props.for, [].concat(child.props.children).map(c => getChildTree(c))]
  }
}

export default class StoryBook extends Component {

  constructor(props) {
    super(props);

    const tree = [].concat(this.props.children).map(child => {
      return getChildTree(child);
    });

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
    }
  }

  setSelected(path) {
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

  render() {
    console.log(this.state.tree);
    return (
      <div>
        <div style={{ width: '30%', display: 'inline-block' }}>
          <Sidebar setSelected={this.setSelected} tree={this.state.tree}/>
        </div>

        <div style={{ width: '70%', display: 'inline-block' }}>
          Selected Component
          {this.getSelected()}
        </div>
      </div>
    )
  }
}

StoryBook.childContextTypes = {
  setSelected: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.number),
}
