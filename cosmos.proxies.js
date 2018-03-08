// cosmos.proxies.js
import createLocalStorageProxy from 'react-cosmos-localstorage-proxy';
import createFetchProxy from 'react-cosmos-fetch-proxy';
import createReduxProxy from 'react-cosmos-redux-proxy';
import createRouterProxy from 'react-cosmos-router-proxy';
import createWrapperProxy from 'react-cosmos-wrapper-proxy';

import Container from 'common/components/Container';
import configureStore from './app/store/configureStore';

const wrapperProxy = createWrapperProxy({
  component: Container, // The wrapper component
  fixtureKey: 'withCosmosWrapper', // Used for toggling (or passing props)
});

// Order matters
export default [
  wrapperProxy,
  createLocalStorageProxy(),
  createFetchProxy(),
  createReduxProxy({ createStore: (state) => configureStore(state).store }),
  createRouterProxy(),
];
