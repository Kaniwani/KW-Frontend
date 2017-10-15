import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers, branch, renderNothing } from 'recompose';

import actions from 'shared/actions';
import { makeSelectReviewHidden } from 'shared/selectors';
import LockButton from 'components/LockButton';

import { grey } from 'shared/styles/colors';
import { Text } from './styles';

ReviewLock.propTypes = {
  isHidden: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

ReviewLock.defaultProps = {
  isHidden: false,
};

function ReviewLock({ isHidden, onClick, ...props }) {
  return (
    <LockButton
      plainButton={false}
      bgColor={grey}
      colorHover={grey}
      isLocked={isHidden}
      onClick={onClick}
      {...props}
    >
      <Text>{`${isHidden ? 'Unlock' : 'Lock'} Review`}</Text>
    </LockButton>
  );
}

const mapStateToProps = (state, { id }) => ({
  isHidden: makeSelectReviewHidden(id)(state),
});

const mapDispatchToProps = {
  lockReview: actions.review.lock.request,
  unlockReview: actions.review.unlock.request,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(({ isHidden }) => isHidden === null, renderNothing),
  withHandlers({
    onClick: ({ id, isHidden, lockReview, unlockReview }) => () =>
      isHidden ? unlockReview({ id }) : lockReview({ id }),
  }),
);

export default enhance(ReviewLock);
