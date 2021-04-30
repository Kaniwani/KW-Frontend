import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectCategory,
  selectPercentComplete,
  selectPercentCorrect,
  selectCompleteCount,
  selectSessionRemainingCount,
} from 'features/quiz/QuizSession/selectors';

import Icon from 'common/components/Icon';
import IconLink from 'common/components/IconLink';
import IconButton from 'common/components/IconButton';
import { grey } from 'common/styles/colors';
import ProgressBar from './ProgressBar';
import { Wrapper, ActionsWrapper, StatsWrapper, Stat, Label } from './styles';

QuizHeader.propTypes = {
  summaryRoute: PropTypes.string.isRequired, // /lessons, /reviews
  isConversionEnabled: PropTypes.bool.isRequired,
  onToggleConversion: PropTypes.func.isRequired,
  percentComplete: PropTypes.number,
  percentCorrect: PropTypes.number,
  completeCount: PropTypes.number,
  remainingCount: PropTypes.number,
};

QuizHeader.defaultProps = {
  percentComplete: 0,
  percentCorrect: 0,
  completeCount: 0,
  remainingCount: 0,
};

export function QuizHeader({
  summaryRoute,
  isConversionEnabled,
  onToggleConversion,
  percentComplete,
  percentCorrect,
  completeCount,
  remainingCount,
}) {
  return (
    <Wrapper>
      <ProgressBar value={percentComplete} />
      <ActionsWrapper>
        <IconLink
          plainLink
          style={{ opacity: 1, marginRight: '.35em' }}
          to={summaryRoute}
          title="View session summary"
          name="SUMMARY"
          size="1.4em"
        />
        <IconButton
          color={isConversionEnabled ? undefined : grey[6]}
          title={`Romaji conversion ${isConversionEnabled ? 'enabled' : 'disabled'}`}
          name="TRANSLATE"
          size="1.25em"
          onClick={onToggleConversion}
        />
      </ActionsWrapper>
      <StatsWrapper>
        <Stat title="Correctness">
          <Icon inline={false} size="1.15em" name="CHECK" />
          <Label>{`${percentCorrect}%`}</Label>
        </Stat>
        <Stat title="Items complete">
          <Icon inline={false} size="1.1em" name="ASSIGNMENT_CHECK" />
          <Label>{completeCount}</Label>
        </Stat>
        <Stat title="Items remaining">
          <Icon inline={false} size="1.1em" name="ASSIGNMENT_INBOX" />
          <Label>{Math.max(remainingCount - 1, 0) /* don't include current question */}</Label>
        </Stat>
      </StatsWrapper>
    </Wrapper>
  );
}

const mapStateToProps = (state, props) => ({
  summaryRoute: `/${selectCategory(state, props)}`,
  percentComplete: selectPercentComplete(state, props),
  percentCorrect: selectPercentCorrect(state, props),
  completeCount: selectCompleteCount(state, props),
  remainingCount: selectSessionRemainingCount(state, props),
});

export default connect(mapStateToProps)(QuizHeader);
