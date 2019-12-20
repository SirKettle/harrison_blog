import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import styled, { createGlobalStyle } from 'styled-components';
import { actions as configActions } from 'state/domain/config/action';
import * as configSelectors from 'state/domain/config/selector';
import { Loading } from '../Loading';
import { LOADING_STATUS } from '../../state/loadingStatus';
import { Home } from '../Home';
import { Blog } from '../Blog';
import { MaxWidth, Padding } from '../styledComponents';
import blogConfig from 'state/domain/blog/config';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${blogConfig.find(c => c.tag === 'home').background};
    transition: background 1s ease-out;
    color: white;
    line-height: 1.5;
  }
`;

export const _App = ({ config, getConfig, configLoadingStatus }) => {
  React.useEffect(() => {
    getConfig();
  }, []);

  React.useEffect(() => {
    if (configLoadingStatus === LOADING_STATUS.SUCCESS) {
      console.log(
        `“${config.description}” by ${config.author && config.author.name} - v${config.version} - ${
          process.env.NODE_ENV
        }`,
      );
    }
  }, [configLoadingStatus, config]);

  return (
    <div>
      <GlobalStyle />
      <MaxWidth>
        <Padding>
          <Loading status={configLoadingStatus}>
            <Switch>
              <Route path="/" exact>
                <Home title={config.description} />
              </Route>
              <Route path="/blog/:tag">
                <Blog />
              </Route>
            </Switch>
          </Loading>
        </Padding>
      </MaxWidth>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  configLoadingStatus: configSelectors.loadingSelector,
  config: configSelectors.dataSelector,
});

const mapDispatchToProps = {
  getConfig: configActions.getConfig,
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_App);
