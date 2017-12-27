import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toKana } from 'wanakana';
import { reduxForm, Field, SubmissionError, propTypes as formPropTypes } from 'redux-form';

import synonyms from 'features/synonyms/actions';
import { onlyKanjiOrKana, onlyKana } from 'common/validations';

import AddSynonymField from './AddSynonymField';
import Button from 'common/components/Button';
import { blue } from 'common/styles/colors';
import { Form } from './styles';

export const ANSWER_TYPES = {
  WORD: 'WORD',
  READING: 'READING',
};

AddSynonymForm.propTypes = {
  ...formPropTypes,
  id: PropTypes.number.isRequired, // associated review id
  answerValue: PropTypes.string,
  answerType: PropTypes.oneOf([...Object.keys(ANSWER_TYPES), '']),
};

AddSynonymForm.defaultProps = {
  answerValue: '',
  answerType: '',
};

export function AddSynonymForm({ handleSubmit, submitting, answerValue, answerType }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="word"
        type="text"
        component={AddSynonymField}
        label={ANSWER_TYPES.WORD}
        normalize={(value) => toKana(value, { IMEMode: true })}
        userAnswer={answerValue}
        answerType={answerType}
      />
      <Field
        name="reading"
        type="text"
        component={AddSynonymField}
        label={ANSWER_TYPES.READING}
        normalize={(value) => toKana(value, { IMEMode: true })}
        userAnswer={answerValue}
        answerType={answerType}
      />
      <Button
        style={{ maxWidth: '5em' }}
        type="submit"
        title="Add Synonym"
        colorHover={blue}
        bgColor={blue}
        disabled={submitting}
      >
        {submitting ? 'Adding' : 'Add'}
      </Button>
    </Form>
  );
}

const mapStateToProps = (state, props) => ({
  // FIXME: only passed from quiz version
  // answerType: ANSWER_TYPES.WORD,
  // answerValue: "大人しい",
  // initialValues: {
  //   word: "",
  //   reading: "",
  // },
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'addSynonym',
    onSubmit: ({ word, reading }, dispatch, { id, ...props }) => {
      const errors = {
        word: onlyKanjiOrKana(word),
        reading: onlyKana(reading),
      };
      if (Object.values(errors).some(Boolean)) {
        throw new SubmissionError(errors);
      }
      dispatch(synonyms.add.request({ reviewId: id, word, reading }, props));
    },
  })
);

export default enhance(AddSynonymForm);
