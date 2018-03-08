import LockButton from 'old/features/LockButton';

export default {
  component: LockButton,

  props: {
    size: '3em',
    isActionable: true,
    isSubmitting: false,
    isLocked: true,
    onClick: () => window.alert('clicked!'), // eslint-disable-line no-alert
  },
};
