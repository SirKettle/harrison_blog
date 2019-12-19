import { call, put, takeLatest } from 'redux-saga/effects';
import { actions, actionTypes } from './action';
import { createApi } from './api';

export function* getConfig(api) {
  try {
    const data = yield call(api.getConfig);
    yield put(actions.getConfigSuccess(data));
  } catch (error) {
    yield put(actions.getConfigError(error));
  }
}

export default function* watch() {
  const api = createApi();
  yield takeLatest(actionTypes.getConfig, getConfig, api);
}
