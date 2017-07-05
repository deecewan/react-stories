import React from 'react';
import { render as reactRender } from 'react-dom';
import App from './App';

const render = (Component) => {
  reactRender(<Component />, document.getElementById('app'))
}

if (module.hot && module.hot instanceof Object) {
  module.hot.accept('./App', () => {
    render(require('./App').default); // eslint-disable-line
  });
}

render(App);
