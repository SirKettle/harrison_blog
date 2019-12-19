import '@babel/polyfill';
import 'sanitize.css/sanitize.css';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { App } from 'components/App';
import HandleRouteChange from 'components/HandleRouteChange';
import { configureStore } from './state/configureStore';

const mountNode = document.getElementById('app');

const renderApp = (isHot = false) => {
  const store = configureStore();
  render(
    <Provider store={store}>
      <Router>
        <HandleRouteChange />
        <App isHot={isHot} />
      </Router>
    </Provider>,
    mountNode,
  );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('components/App', () => {
    unmountComponentAtNode(mountNode);
    renderApp();
  });
}

renderApp();
