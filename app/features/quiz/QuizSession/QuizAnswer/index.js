import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bind, unbind } from 'wanakana';

import { SRS_RANKS } from 'common/constants';

import quiz from 'features/quiz/actions';
import selectAnswer from 'features/quiz/QuizSession/QuizAnswer/selectors';
import { selectCurrentStreakName } from 'features/quiz/QuizSession/selectors';
import {
  Form,
  AnswerWrapper,
  Label,
  Streak,
  Input,
  ActionButtons,
  IgnoreButton,
  SubmitButton,
} from './styles';

export class QuizAnswer extends React.Component {
  static propTypes = {
    onIgnore: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    streakName: PropTypes.string,
    value: PropTypes.string,
    isFocused: PropTypes.bool,
    isMarked: PropTypes.bool,
    isValid: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isCorrect: PropTypes.bool,
    isIncorrect: PropTypes.bool,
  };

  static defaultProps = {
    streakName: SRS_RANKS.ZERO,
    isFocused: true,
    isMarked: false,
    isValid: false,
    isDisabled: false,
    isCorrect: false,
    isIncorrect: false,
  };

  componentDidMount() {
    bind(this.inputFieldRef);
  }

  componentDidUpdate() {
    // Answer reset, terminal N fixed etc.
    if (this.inputFieldRef.value !== this.props.value) {
      this.inputFieldRef.value = this.props.value;
    }
    if (this.props.isFocused) {
      this.inputFieldRef.focus();
    } else {
      // Input is blurred when disabled,
      // so we need to focus on something for hotkeys in QuizSession
      this.formRef.focus();
    }
  }

  componentWillUnmount() {
    unbind(this.inputFieldRef);
  }

  onIgnore = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onIgnore();
  };

  onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSubmit(this.inputFieldRef.value);
  };

  render() {
    const {
      isFocused,
      isDisabled,
      isCorrect,
      isIncorrect,
      isMarked,
      isValid,
      streakName,
    } = this.props;
    return (
      <Form
        innerRef={(node) => {
          this.formRef = node;
        }}
        onSubmit={this.onSubmit}
        marked={isMarked}
        valid={isValid}
        correct={isCorrect}
        incorrect={isIncorrect}
        tabIndex={0}
      >
        <AnswerWrapper>
          <Streak streakName={streakName} size="1.15em" />
          <Label htmlFor="answer">Vocabulary reading</Label>
          <Input
            innerRef={(node) => {
              this.inputFieldRef = node;
            }}
            id="answer"
            lang="ja"
            type="text"
            placeholder="答え"
            focus={isFocused}
            disabled={isDisabled}
            marked={isMarked}
            valid={isValid}
            autoFocus={isFocused}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
          />
          <ActionButtons>
            {isDisabled && (
              <IgnoreButton
                name="CLOSE"
                type="button"
                title="Ignore answer"
                size="1.4em"
                onClick={this.onIgnore}
              />
            )}
            <SubmitButton
              name="ARROW_RIGHT"
              type="submit"
              title="Submit answer"
              size="1.75em"
              onClick={this.onSubmit}
            />
          </ActionButtons>
        </AnswerWrapper>
      </Form>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...selectAnswer(state, props),
  streakName: selectCurrentStreakName(state, props),
});

const mapDispatchToProps = {
  onUpdate: quiz.answer.update,
  onSubmit: quiz.answer.submit,
  onIgnore: quiz.answer.ignore,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizAnswer);
