/* @flow */

import React from 'react';
import { StoryBook, Chapter, Story } from '../src';

function SubItem({ number }: { number: string }) {
  return (
    <div>
      This is a story for sub button item {number}
    </div>
  );
}

export default function App() {
  return (
    <StoryBook>
      <Chapter for="first item">
        <Story desc="first story">
          <div>hello, world!</div>
        </Story>
      </Chapter>
      <Chapter for="Button">
        <Story desc="Standard Button">
          <button>Click Me!</button>
        </Story>
        <Chapter for="SubButton">
          <Story desc="sub button item 1">
            <SubItem number="1" />
          </Story>
          <Story desc="sub button item 2"><SubItem number="2" /></Story>
          <Story desc="sub button item 3"><SubItem number="3" /></Story>
          <Story desc="sub button item 4"><SubItem number="4" /></Story>
        </Chapter>
      </Chapter>
    </StoryBook>
  );
}
