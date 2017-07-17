/* @flow */

import React from 'react';

type PropsType = {
  selected: string,
  setTab: (string) => void,
  tabs: Array<string>,
};

export default function TabBar(props: PropsType) {
  const selected = props.selected;
  const setTab = props.setTab;
  return (
    <div>
      {props.tabs.map(tab => (
        <button
          key={tab}
          onClick={() => {
            if (tab === selected) { return; }
            setTab(tab);
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
