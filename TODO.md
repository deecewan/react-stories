# Add Redux

- Allow addons to register a reducer that they then have complete control over

# Terminals

- Allow addons to send a `terminal` component to the viewer
  - Standard react component
  - They have complete control over the contents
  - They can access any reducers they need (connected)
- These 'terminals' are used to add functionality, like updating props,
  displaying `README`s, etc.

# Create Prop-Control

- register a reducer (as above)
- create a HOC that wraps a story to provide it with certain items
  - should also work if wrapping a chapter - push the props to all child stories

# Create Set-State

- addon that allows components to set/use state, so they can update controlled
  items without the need to create a wrapper component
