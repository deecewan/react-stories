/* @flow */

export const sidebar = {
  fontFamily: 'Helvetica Neue',
  userSelect: 'none',
};

export const chapterTitle = (selected: boolean) => ({
  paddingBottom: 5,
  borderBottom: '1px solid grey',
  fontSize: 16,
  fontWeight: selected ? '600' : '400',
  cursor: 'pointer',
});

export const storyTitle = (selected: boolean) => ({
  fontSize: 14,
  fontWeight: selected ? '600' : '400',
  cursor: 'pointer',
});
