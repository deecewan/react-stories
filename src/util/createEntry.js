/* @flow */

import { writeFileSync } from 'fs';
import { join } from 'path';

export default function createEntry(location: string) {
  const entry = `
import React from 'react';
import { render as reactRender } from 'react-dom';
import App from '${location}';

const render = (Component) => {
  reactRender(<Component />, document.getElementById('app'));
};

if (module.hot && module.hot instanceof Object) {
  module.hot.accept(${location}, () => {
    render(require(${location}).default);
  });
}

render(App);
`;

  const fileName = join(process.cwd(), 'stories.jsx');
  writeFileSync(fileName, entry);

  return fileName;
}
