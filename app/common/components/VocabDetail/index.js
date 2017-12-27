import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';

import review from 'features/reviews/actions';

import {
  selectReviewVocabIds,
  selectReviewSynonymIds,
  selectIsHidden,
} from 'features/reviews/selectors';

import Aux from 'common/components/Aux';
import VocabWord from 'common/components/VocabWord';
import VocabSynonymList from 'common/components/VocabSynonym';
import TagsList from 'common/components/TagsList';
import SentencePair from 'common/components/SentencePair';
import StrokeLoader from 'common/components/KanjiStroke';
import ReadingLinks from 'common/components/ReadingLinks';
import PitchDiagramList from 'common/components/PitchDiagram';
import AddSynonym from 'common/components/AddSynonym';
import VocabLockButton from 'common/components/VocabLockButton';
import Notes from 'features/reviews/Notes';

// FIXME: infopanel needs to implement scroll to top when open
// import { withContentRect } from 'react-measure';
// import smoothScrollY from 'common/utils/smoothScrollY';

// TODO: spacing between vocab, synonym title?

VocabDetail.propTypes = {
  id: PropTypes.number.isRequired,
  vocabIds: PropTypes.array.isRequired,
  synonymIds: PropTypes.array.isRequired,
  hidden: PropTypes.bool,
  showTags: PropTypes.bool,
  showLinks: PropTypes.bool,
  showSentence: PropTypes.bool,
  showPitch: PropTypes.bool,
  showStroke: PropTypes.bool,
  showNotes: PropTypes.bool,
  showLock: PropTypes.bool,
  showAddSynoynm: PropTypes.bool,
  lockReview: PropTypes.func.isRequired,
  unlockReview: PropTypes.func.isRequired,
};

VocabDetail.defaultProps = {
  hidden: false,
  showTags: true,
  showLinks: true,
  showSentence: true,
  showPitch: true,
  showStroke: true,
  showNotes: true,
  showAddSynoynm: true,
  showLock: true,
};

export function VocabDetail({
  id,
  vocabIds,
  synonymIds,
  hidden,
  showTags,
  showLinks,
  showSentence,
  showPitch,
  showStroke,
  showNotes,
  showAddSynoynm,
  showLock,
  lockReview,
  unlockReview,
}) {
  return (
    <Aux>
      {vocabIds.map((vocabId) => (
        <div key={cuid()}>
          {<VocabWord id={vocabId} />}
          {showTags && <TagsList id={vocabId} />}
          {showLinks && <ReadingLinks id={vocabId} />}
          {showPitch && <PitchDiagramList id={vocabId} />}
          {showSentence && <SentencePair id={vocabId} />}
          {showStroke && <StrokeLoader id={vocabId} />}
        </div>
      ))}
      {showNotes && <Notes id={id} />}
      {showAddSynoynm && <AddSynonym id={id} />}
      <VocabSynonymList ids={synonymIds} reviewId={id} />
      {showLock && (
        <VocabLockButton isLocked={hidden} onClick={hidden ? unlockReview : lockReview} />
      )}
    </Aux>
  );
}

const mapStateToProps = (state, props) => ({
  vocabIds: selectReviewVocabIds(state, props),
  synonymIds: selectReviewSynonymIds(state, props),
  hidden: selectIsHidden(state, props),
});

const mapDispatchToProps = (dispatch, props) => ({
  lockReview: () => dispatch(review.lock.request(props)),
  unlockReview: () => dispatch(review.unlock.request(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabDetail);
