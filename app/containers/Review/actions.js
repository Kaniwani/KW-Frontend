/*
 * Review Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REVIEWDATA,
  LOAD_REVIEWDATA_SUCCESS,
  LOAD_REVIEWDATA_ERROR,
  SET_NEW_CURRENT,
  RETURN_CURRENT_TO_QUEUE,
  MOVE_CURRENT_TO_COMPLETED,
  INCREASE_SESSION_CORRECT,
  INCREASE_SESSION_INCORRECT,
  INCREASE_CURRENT_STREAK,
  DECREASE_CURRENT_STREAK,
  RESET_CURRENT_STREAK,
} from './constants';

/**
 * Load the reviewData, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REVIEWDATA
 */
export function loadReviewData() {
  return {
    type: LOAD_REVIEWDATA,
  };
}

/**
 * Dispatched when the review data is loaded by the request saga
 *
 * @param  {object} reviewData The review data
 *
 * @return {object} An action object with a type of LOAD_REVIEWDATA_SUCCESS passing the review data
 */
export function reviewDataLoaded(data) {
  return {
    type: LOAD_REVIEWDATA_SUCCESS,
    payload: data,
  };
}

/**
 * Dispatched when loading the reviewData fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_REVIEWDATA_ERROR passing the error
 */
export function reviewDataLoadingError(error) {
  return {
    type: LOAD_REVIEWDATA_ERROR,
    payload: error,
  };
}

/**
 * Dispatched when rotating in next vocab question
 *
 * @return {object} An action object with a type of SET_NEW_CURRENT
 */
export function setNewCurrent() {
  return {
    type: SET_NEW_CURRENT,
  };
}

/**
 * Inserts current review back into the reviews queue at a random insertion point
 * @return {object} An action object with a type of RETURN_CURRENT_TO_QUEUE
 */
export function returnCurrentToQueue() {
  return {
    type: RETURN_CURRENT_TO_QUEUE,
  };
}
/**
 * Inserts current review back into the reviews queue at a random insertion point
 * @return {object} An action object with a type of RETURN_CURRENT_TO_QUEUE
 */
export function moveCurrentToCompleted() {
  return {
    type: MOVE_CURRENT_TO_COMPLETED,
  };
}


/**
 * Increases the streak count by 1 on the current review item
 * @param {number} previousStreak The previous streak number to be stored for RESET_CURRENT_STREAK action
 * @return {object} An action object with a type of INCREASE_CURRENT_STREAK and a payload of the previous streak
 */
export function increaseCurrentStreak(previousStreak) {
  return {
    type: INCREASE_CURRENT_STREAK,
    payload: previousStreak,
  };
}

/**
 * Decreases the streak count by 1 on the current review item
 * @param {number} previousStreak The previous streak number to be stored for RESET_CURRENT_STREAK action
 * @return {object} An action object with a type of DECREASE_CURRENT_STREAK and a payload of the previous streak
 */
export function decreaseCurrentStreak(previousStreak) {
  return {
    type: DECREASE_CURRENT_STREAK,
    payload: previousStreak,
  };
}

/**
 * Resets the streak count on the current review item to the stored previous streak count
 * @return {object} An action object with a type of RESET_CURRENT_STREAK
 */
export function resetCurrentStreak() {
  return {
    type: RESET_CURRENT_STREAK,
  };
}

/**
 * Increases the session total correct count by 1
 * @return {object} An action object with a type of INCREASE_SESSION_CORRECT
 */
export function increaseSessionCorrect() {
  return {
    type: INCREASE_SESSION_CORRECT,
  };
}

/**
 * Increases the session total incorrect count by 1
 * @return {object} An action object with a type of INCREASE_SESSION_INCORRECT
 */
export function increaseSessionIncorrect() {
  return {
    type: INCREASE_SESSION_INCORRECT,
  };
}
