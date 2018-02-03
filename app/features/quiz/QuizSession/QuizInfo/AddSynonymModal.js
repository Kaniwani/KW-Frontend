import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fixed, Absolute, Overlay, Flex } from 'rebass';

import quiz from 'features/quiz/actions';
import { selectCurrentId, selectSynonymModalOpen } from 'features/quiz/QuizSession/selectors';
import {
  selectAnswerValue,
  selectAnswerType,
} from 'features/quiz/QuizSession/QuizAnswer/selectors';

import IconButton from 'common/components/IconButton';
import AddSynonymForm, { ANSWER_TYPES } from 'common/components/AddSynonym/AddSynonymForm';

export const AddSynonymModal = ({ isOpen, onClose, formProps }) =>
  isOpen ? (
    <div style={{ zIndex: '100' }}>
      <Fixed top right bottom left onClick={onClose} />
      <Overlay w={['320px', '80vw', '720px']}>
        <Absolute top right p={1}>
          <IconButton name="CLOSE" title="Close Add Synonym window" onClick={onClose} />
        </Absolute>
        <Flex justify="center">
          <AddSynonymForm {...formProps} />
        </Flex>
      </Overlay>
    </div>
  ) : null;

AddSynonymModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formProps: PropTypes.shape({
    reviewId: PropTypes.number,
    answerValue: PropTypes.string,
    answerType: PropTypes.oneOf([...Object.keys(ANSWER_TYPES), '']),
    initialValues: PropTypes.shape({
      word: PropTypes.string,
      reading: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, props) => {
  const answerType = selectAnswerType(state, props);
  const answerValue = selectAnswerValue(state, props);
  return {
    isOpen: selectSynonymModalOpen(state, props),
    formProps: {
      id: selectCurrentId(state, props),
      answerValue,
      answerType,
      initialValues: {
        word: answerType === ANSWER_TYPES.WORD ? answerValue : '',
        reading: answerType === ANSWER_TYPES.READING ? answerValue : '',
      },
    },
  };
};

const mapDispatchToProps = {
  onClose: () => quiz.session.setSynonymModal(false),
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSynonymModal);
