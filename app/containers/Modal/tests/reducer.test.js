import modalReducer, { modalInitialState } from '../reducer';
// import { fromJS } from 'immutable';

describe('modalReducer', () => {
  it('returns the initial state', () => {
    expect(modalReducer(undefined, {})).toEqual(modalInitialState);
  });
});
