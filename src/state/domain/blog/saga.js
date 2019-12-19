import { call, put, takeLatest } from 'redux-saga/effects';
import { actions, actionTypes } from './action';
import { createApi } from './api';
import { htmlResponse } from './tests/mockPosts';

const api = createApi();
export function* getPosts({ payload }) {
  // debugger;
  try {
    // const data = htmlResponse;
    const data = yield call(api.getPosts, payload);
    yield put(actions.getPostsSuccess(data));
  } catch (error) {
    yield put(actions.getPostsError(error));
  }
}

export default function* watch() {
  yield takeLatest(actionTypes.getPosts, getPosts);
}
