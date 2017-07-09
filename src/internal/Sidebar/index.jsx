/* @flow */

import React, { Component } from 'react';
import SidebarChapter from './SidebarChapter';
import type { TreeType } from '../../types.js.flow';

type PropsType = {
  tree: TreeType,
};

type StateType = {
  open: boolean,
};

export default class Sidebar extends Component {
  props: PropsType;
  state: StateType;

  constructor(props: PropsType) {
    super(props);

    this.state = { open: true };
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  getChildren() {
    return this.props.tree.map((branch, i) => {
      if (typeof branch[0] !== 'string') {
        throw new Error(
          `${branch.toString()} is not a Chapter.` +
          'All StoryBook children must be chapters.',
        );
      }
      if (!Array.isArray(branch[1])) {
        throw new Error(`Chapter ${branch[0]} must have at least one Story.`);
      }
      return (
        <SidebarChapter
          key={branch[0]}
          name={branch[0]}
          stories={branch[1]}
          path={[i]}
        />
      );
    });
  }

  render() {
    return (
      <div className="sidebar">
        {this.getChildren()}
      </div>
    );
  }
}
