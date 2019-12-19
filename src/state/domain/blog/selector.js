import { createSelector } from 'reselect';
import { path, prop } from 'ramda';

export const domainSelector = state => state.blog;

export const dataSelector = createSelector(
  domainSelector,
  prop('data'),
);

export const blogSelector = createSelector(
  dataSelector,
  path(['response', 'blog']),
);

export const postsSelector = createSelector(
  dataSelector,
  data => path(['response', 'posts'])(data) || [],
);

export const loadingSelector = createSelector(
  domainSelector,
  prop('loading'),
);
