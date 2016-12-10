import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import keydown from 'react-keydown';

import blockEvent from 'utils/blockEvent';
import { handleShortcuts } from './utils';
import { selectCurrentStreak } from 'containers/Review/selectors';
import AnswerInput from 'containers/AnswerInput';
import { showModal } from 'containers/Modal/actions';
import { ADD_SYNONYM_MODAL } from 'containers/Modal/constants';
import { toggleVocabInfo } from 'containers/ReviewInfo/actions';

import {
  selectAnswerMarked,
  selectAnswerValid,
  selectkeysInListMatch,
  selectInputDisabled,
 } from 'containers/AnswerInput/selectors';

import {
  markIgnored,
  checkAnswer,
  processAnswer,
} from './actions';


import Form from './Form';
import StreakIcon from './StreakIcon';
import SubmitButton from './SubmitButton';
import IgnoreButton from './IgnoreButton';

class ReviewAnswer extends React.PureComponent {
  constructor() {
    super();
    this._handleKeyDown = handleShortcuts.bind(this);
  }

  componentWillReceiveProps({ keydown, disabled }) { // eslint-disable-line no-shadow
    if (disabled && keydown.event) {
      this._handleKeyDown(keydown.event);
    }
  }

  _ignoreAnswer = (event) => {
    blockEvent(event);
    const { valid, matches } = this.props;
    if (valid) this.props.ignoreAnswer(matches);
  }

  _processAnswer = (event) => {
    blockEvent(event);
    this.props.processAnswer();
  }

  _checkAnswer = (event) => {
    blockEvent(event);
    this.props.checkAnswer();
  }

  _toggleVocabInfo = (event, options) => {
    blockEvent(event);
    this.props.toggleVocabInfo(options);
  }

  _showSynonymModal = (event) => {
    blockEvent(event);
    this.props.showSynonymModal();
  }

  render() {
    const { streak, marked, valid, matches, disabled } = this.props; // eslint-disable-line no-shadow
    return (
      <Form
        marked={marked}
        valid={valid}
        onSubmit={marked && valid ? this._processAnswer : this._checkAnswer}
      >
        <StreakIcon
          streak={streak}
        />
        <AnswerInput
          disabled={disabled}
          streak={streak}
          marked={marked}
          matches={matches}
          valid={valid}
        />
        <IgnoreButton
          onIgnoreClick={this._ignoreAnswer}
          valid={valid}
          marked={marked}
        />
        <SubmitButton />
        {/* TODO: <StreakAnimation /> */}
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  streak: selectCurrentStreak(),
  marked: selectAnswerMarked(),
  valid: selectAnswerValid(),
  matches: selectkeysInListMatch(),
  disabled: selectInputDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkAnswer: () => dispatch(checkAnswer()),
    processAnswer: () => dispatch(processAnswer()),
    ignoreAnswer: (correct) => dispatch(markIgnored(correct)),
    toggleVocabInfo: (options) => dispatch(toggleVocabInfo(options)),
    showSynonymModal: () => dispatch(showModal({ modalType: ADD_SYNONYM_MODAL })),
  };
}

ReviewAnswer.propTypes = {
  streak: PropTypes.number.isRequired,
  marked: PropTypes.bool.isRequired,
  valid: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.null,
  ]),
  disabled: PropTypes.bool.isRequired,
  matches: PropTypes.bool.isRequired,
  checkAnswer: PropTypes.func.isRequired,
  processAnswer: PropTypes.func.isRequired,
  ignoreAnswer: PropTypes.func.isRequired,
  toggleVocabInfo: PropTypes.func.isRequired,
  showSynonymModal: PropTypes.func.isRequired,
};

export default keydown(connect(mapStateToProps, mapDispatchToProps)(ReviewAnswer));
