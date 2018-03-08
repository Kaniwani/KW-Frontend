import AddSynonymForm, { ANSWER_TYPES } from 'common/components/AddSynonym/AddSynonymForm';

export default {
  component: AddSynonymForm,

  reduxState: {},
  props: {
    form: 'addSynonym',
    answerType: ANSWER_TYPES.WORD,
    answerValue: '大人しい',
    initialValues: {
      word: '大人しい',
      reading: '',
    },
    onSubmit: () => window.alert('Submit!'),
  },
};
