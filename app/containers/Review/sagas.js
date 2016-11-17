import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REVIEWDATA } from './constants';
import { reviewDataLoaded, reviewDataLoadingError } from './actions';
import { shapeReviewData } from './utils';

import request from 'utils/request';

/**
 *  request/response handler
 */
export function* getReviewData(limit = 100) {
  const requestURL = `api/reviews/?limit=${limit}`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    const shapedData = yield call(shapeReviewData, data);
    yield put(reviewDataLoaded(shapedData));
  } catch (err) {
    yield put(reviewDataLoadingError(err));
  }
}

/**
 * Watches for LOAD_REVIEWDATA actions and calls getReviewData when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* getReviewDataWatcher() {
  yield fork(takeLatest, LOAD_REVIEWDATA, getReviewData);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* reviewSaga() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getReviewDataWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  reviewSaga,
];
