# react-stories
> Declarative story creation for React

## Motivation

Following the great work from
[@storybooks/storybook](https://github.com/storybooks/storybook), I decided that
for building stories in a React environment, we should be using a declarative
API. Additionally, I wanted to be able to nest stories inside of other stories.
So I've started building a similar concept, but very different execution.

Nesting is super useful to keep all components of different implementation but
similar type together. For instance, you may have multiple buttons that extend
from a single root button. To keep your `ActionButton` with your `SubmitButton`
(or whatever), you can nest them under a common `Button` story.

## Usage

```js
// Button.jsx
export default function Button(props) {
  return (<button>{props.label}</button>)
}

// BlueButton.jsx
export default function BlueButton(props) {
  return (<button style={{ backgroundColor: 'blue' }}>{props.label}</button>);
}

// Storybook.jsx

import { StoryBook, Chapter, Story } from 'react-stories';
import Button from './Button';
import BlueButton from './BlueButton';

export default function Stories() {
  <StoryBook>
    <Chapter name="Button">
      <Story desc="A standard button">
        <Button label="My Cool Button" />
      </Story>
      <Chapter name="BlueButton">
        <Story desc="A cool blue button">
          <BlueButton label="My Blue Button" />
        </Story>
      </Chapter>
    </Chapter>
  </StoryBook>
}
```

## Development

- clone the repo
- run `yarn`
- run `yarn serve` to run the dev server with the demo loaded

## TODO

Everything. This is very much a work in progress.
