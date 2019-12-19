import { all } from 'redux-saga/effects';
import configSaga from './domain/config/saga';
import blogSaga from './domain/blog/saga';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([configSaga(), blogSaga()]);
}
