#!/usr/bin/env node
/* @flow */

import { resolve } from 'path';
import yargs from 'yargs';
import webpack from 'webpack';
import Server from 'webpack-dev-server';
import originalConfig from '../../webpack.config';
// import createEntry from '../util/createEntry';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const args = yargs // eslint-disable-line
  .usage('$0 [args]')
  .coerce('book', book => resolve(process.cwd(), book))
  .alias('b', 'book')
  .default('book', 'stories.jsx')
  .help()
  .argv;

const book = args.book;

// const entry = createEntry(book);

// const modules = [
//   join(process.cwd(), 'node_modules'),
//   resolve(__dirname, '..', '..', 'node_modules'),
// ];

const config = Object.assign({}, originalConfig);

config.entry.bundle = book;

const compiler = webpack(config);
// compiler.run((err, stats) => {
//   console.log('err:', err);
//   console.log('stats: ', stats.compilation.errors);
// });

const server = new Server(compiler);

['SIGINT', 'SIGTERM'].forEach((sig) => {
  process.on(sig, () => {
    server.close();
    process.exit(); // eslint-disable-line no-process-exit
  });
});

server.listen('8080', 'localhost', (err) => {
  if (err) {
    throw err;
  }
  console.log('Server started successfully at: http://localhost:8080');
});
