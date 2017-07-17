/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToTerminal, clearTab } from '../store/terminal/actions';
import { subscribe, type ComponentsType } from '../addons';
import { terminal as style } from './style';

import TabBar from './TabBar';
import Tab from './Tab';

type PropsType = {
  clearTab: (string) => void,
};

type StateType = {
  selectedTab: string,
  terminals: ComponentsType,
  unsubscribe: () => void,
};

export class Terminal extends Component {

  props: PropsType;
  state: StateType;
  noop: () => void;
  setTab: (string) => void;

  constructor(props: PropsType) {
    super(props);

    const unsubscribe = subscribe((terminals) => {
      this.setState({ terminals });
    });

    this.noop = () => {};

    this.state = { unsubscribe, selectedTab: '', terminals: {} };
    this.setTab = this.setTab.bind(this);
  }

  getSelected(selected: string) {
    const terminal = this.state.terminals[selected];
    return terminal || this.noop;
  }

  getTabs() {
    return Object.keys(this.state.terminals);
  }

  setTab(tabName: string) {
    this.setState({ selectedTab: tabName });
  }

  render() {
    const selected = this.state.selectedTab || this.getTabs()[0];
    return (
      <div>
        <TabBar
          tabs={this.getTabs()}
          setTab={this.setTab}
          selected={selected}
        />
        <div style={style.wrapper}>
          <Tab
            name={selected}
          >
            {this.getSelected(selected)()}
          </Tab>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    terminal: state.terminal,
  };
}

export default connect(mapStateToProps, { clearTab, addToTerminal })(Terminal);
