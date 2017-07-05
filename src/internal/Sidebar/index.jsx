import React from 'react';
import PropTypes from 'prop-types';

function renderStories(stories, path, setSelected) {
  return stories.map((child, i) => {
    const nextPath = path.concat(i);
    if (typeof child === 'string') {
      return <SidebarStory desc={child} path={nextPath} />;
    }
    return <SidebarChapter name={child[0]} stories={child[1]} path={nextPath} />;
  });
}

function getIndent(path) {
  // start off at 0 indent
  const indentationCount = path.length - 1;
  return indentationCount * 15;
}

function SidebarChapter(props) {
  return (
    <div style={{marginLeft: getIndent(props.path)}}>
      <h4>{props.name}</h4>
      {renderStories(props.stories, props.path)}
    </div>
  );
}

function SidebarStory(props, context) {
  return (
    <div
      style={{marginLeft: getIndent(props.path)}}
      onClick={() => context.setSelected(props.path)}
    >
      {props.desc}
    </div>
  );
}

SidebarStory.contextTypes = {
  setSelected: PropTypes.func,
}

export default function Sidebar(props) {
  const tree = props.tree;
  return (
    <div className="sidebar">
      {tree.map((branch, i) =>
        <SidebarChapter
          name={branch[0]}
          stories={branch[1]}
          path={[i]}
        />
      )}
    </div>
  )
}
