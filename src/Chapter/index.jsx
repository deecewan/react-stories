import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Chapter extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      tree: {},
    }

    this.addDescription = this.addDescription.bind(this);
  }

  getChildContext() {
    return {
      addDescription: this.addDescription,
    };
  }

  addDescription(desc) {
    this.setState({

    });
  }

  buildTree() {
    return {
      [this.props.for]: [].concat(this.props.children).map(child => {
        console.log(child.constructor.displayName);
      }),
    }
  }

  render() {
    return (
      <div>
        <div>Chapter {this.props.for}</div>
        <div>Children: {this.props.children}</div>
      </div>
    );
  }
}

Chapter.contextTypes = {
  addBranch: PropTypes.func,
};

Chapter.childContextTypes = {
  addDescription: PropTypes.func,
};
