/* eslint-disable no-console */
/* eslint-disable no-constant-condition */

import { take, select, call, put, race, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { shapeReviewData } from './utils';
import {
  LOAD_REVIEWDATA,
  MOVE_CURRENT_TO_COMPLETED,
  PROCESS_ANSWER,
  CHECK_ANSWER,
  MARK_CORRECT,
  MARK_INCORRECT,
  MARK_IGNORED,
} from './constants';
import {
  loadReviewData,
  reviewDataLoaded,
  reviewDataLoadingError,
  returnCurrentToQueue,
  // moveCurrentToCompleted,
  markCorrect,
  markIncorrect,
  setNewCurrent,
  increaseStreak,
  decreaseStreak,
  increaseSessionCorrect,
  increaseSessionIncorrect,
} from './actions';
import {
  selectCurrent,
  selectCompletedCount,
  selectQueueCount,
  selectTotalCount,
} from './selectors';

import {
  selectAnswerMatches,
  selectAnswerValid,
} from '../AnswerInput/selectors';


/**
 *  request/response handler
 */
export function* getReviewData(limit = 100) {
  const requestURL = `api/reviews/?limit=${limit}`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    const shapedData = shapeReviewData(data);
    yield put(reviewDataLoaded(shapedData));
    yield put(setNewCurrent());
  } catch (err) {
    yield put(reviewDataLoadingError(err));
  }
}

export function* recordAnswer() {
// TODO: get @tadgh to change all these old ajax urls to /api/ ?
//  const postURL = '/kw/record_answer/';

  const [
    current,
    // authToken,
  ] = yield [
    select(selectCurrent()),
    // select(selectAuthToken())
  ];

  const postData = {
    csrfmiddlewaretoken: 'csrf here',
    user_specific_id: current.get('id'),
    user_correct: current.getIn(['session', 'correct']) >= 1,
    wrong_before: current.getIn(['session', 'incorrect']) >= 1,
  };

  // TODO: use axios; request is just a fetch function
  // TODO: batch in lots of ten (or less if reviews completed)?
  // Ask Tadgh if he'd prefer multiple submissions batched or if separate is better.
  // yield fork(request, postURL, postData);

  console.table(postData);
  console.log('recorded on server');

  // TODO: catch errors and notify user answers not recorded
}


/**
 * Watches for LOAD_REVIEWDATA actions and calls getReviewData when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */
export function* getReviewDataWatcher() {
  yield fork(takeLatest, LOAD_REVIEWDATA, getReviewData);
}

export function* processAnswerWatcher() {
  yield fork(takeLatest, PROCESS_ANSWER, recordAnswer);
}

export function* checkAnswerWatcher() {
  while (true) {
    yield take(CHECK_ANSWER);

    const [valid, matches] = yield [
      select(selectAnswerValid()),
      select(selectAnswerMatches()),
    ];

    if (valid && !matches) yield put(markIncorrect());
    if (valid && matches) yield put(markCorrect());
  }
}

// TODO: almost all of this is irrelevant and should really be actioned in processanswer*
// although we DO want to show what the streak change *would* be
export function* markAnswersWatcher() {
  while (true) {
    const { correct, incorrect, ignored } = yield race({
      correct: take(MARK_CORRECT),
      incorrect: take(MARK_INCORRECT),
      ignored: take(MARK_IGNORED),
    });

    const current = yield select(selectCurrent());
    const currentID = current.get('id');
    const currentIncorrectCount = current.getIn(['session', 'incorrect']);
    const previouslyWrong = currentIncorrectCount >= 1;
    const firstTimeWrong = currentIncorrectCount === 1;

    if (correct) {
      console.log(`${currentID} Correct ${!previouslyWrong ? 'Not previously wrong ' : ''}-> should move to complete`);
      if (correct && !previouslyWrong) {
        yield [
          put(increaseStreak()),
          put(increaseSessionCorrect()),
        ];
      }
      // in process answer
      // yield fork(recordAnswer);
      // yield put(moveCurrentToCompleted());
      // yield put(setNewCurrent());
    }
    if (incorrect) {
      if (firstTimeWrong) {
        yield [
          put(decreaseStreak()),
          put(increaseSessionIncorrect()),
        ];
      }
      console.log(`${currentID} Incorrect ${firstTimeWrong ? 'first time ' : ''}-> should return to queue`);
      // in processAnswer
      // yield put(returnCurrentToQueue());
      // yield put(setNewCurrent());
    }
    if (ignored) {
      console.log(`${currentID} Ignored -> returned to queue`);
      yield put(returnCurrentToQueue());
      yield put(setNewCurrent());
    }
  }
}

export function* moveCurrentToCompletedWatcher() {
  while (true) {
    yield take(MOVE_CURRENT_TO_COMPLETED);

    const [queue, total, completed] = yield [
      select(selectQueueCount()),
      select(selectTotalCount()),
      select(selectCompletedCount()),
    ];

    const needMoreReviews = (queue < 10) && (queue + completed < total);
    const queueCompleted = completed === total;
    if (needMoreReviews) {
      console.log('fetching more reviews...');
      yield put(loadReviewData());
      console.log('fetched more reviews!');
    }
    if (queueCompleted) {
      console.log('all reviews complete, show summary page now');
      // TODO: stop quiz and show summary page -> showSummary() action
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* reviewSaga() {
  // Fork watchers so we can continue execution
  const watchers = yield [
    fork(getReviewDataWatcher),
    fork(checkAnswerWatcher),
    fork(markAnswersWatcher),
    fork(processAnswerWatcher),
    fork(moveCurrentToCompletedWatcher),
  ];

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(...watchers);
}

// Bootstrap sagas
export default [
  reviewSaga,
];
