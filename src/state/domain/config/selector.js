import { createSelector } from 'reselect';
import { prop } from 'ramda';

export const domainSelector = state => state.config;

export const dataSelector = createSelector(
  domainSelector,
  prop('data'),
);

export const loadingSelector = createSelector(
  domainSelector,
  prop('loading'),
);
