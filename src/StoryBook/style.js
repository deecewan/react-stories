/* @flow */

export const button = {
  background: 'none',
  border: '1px solid grey',
  borderRadius: 2,
  padding: 5,
  height: 'fit-content',
  flex: 1,
  outline: 'none',
  marginLeft: 10,
};

export const titleWrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 9,
};

export const header = {
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'Helvetica Neue',
  borderBottom: '1px solid grey',
};

export const outer = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  width: '100%',
  height: '100%',
};

export const body = {
  display: 'flex',
  height: '100%',
};

export const sidebarWrapper = {
  minWidth: '20%',
  borderRight: '1px solid grey',
  padding: '0 10px',
};

export const contentWrapper = {
  position: 'relative',
  width: '100%',
};

export const content = {
  padding: 9, // same as `body` padding on Chrome
  position: 'relative', // any absolutely position components work
};

export const terminal = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
};
