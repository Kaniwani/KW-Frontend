import { ReviewStatus } from 'features/dashboard/ReviewStatus';
import { addMinutes } from 'date-fns';

export default {
  withCosmosWrapper: false,
  withCosmosXRay: false,
  component: ReviewStatus,
  props: {
    reviewsCount: 15,
    vacationDate: false,
    nextReviewDate: addMinutes(new Date(), -30),
  },
};
