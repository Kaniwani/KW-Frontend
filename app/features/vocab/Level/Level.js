import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import vocab from 'features/vocab/actions';

import {
  UI_DOMAIN,
  selectVocabLevelShouldLoad,
  selectVocabLevelIsLoading,
  selectVocabLevelLastLoad,
  selectVocabLevelError,
} from './selectors';

import {
  selectVocabLevelReviewIds,
  selectVocabLevelIsLocked,
} from 'features/vocab/Levels/selectors';

import Loader from 'common/components/Loader';
import Aux from 'common/components/Aux';
import Element from 'common/components/Element';
import H1 from 'common/components/H1';
import Toggle from 'common/components/Toggle';
import VocabListToggleButton from 'common/components/VocabListToggleButton';
import VocabList, { ITEM_TYPES } from 'common/components/VocabList';
import Notice from './Notice';

VocabLevel.propTypes = {
  id: PropTypes.number.isRequired,
  reviewIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  isLocked: PropTypes.bool.isRequired,
};

export function VocabLevel({ id, reviewIds, isLocked }) {
  const title = `Level ${id}`;
  return (
    <Toggle
      defaultOn
      render={({ on, toggle }) => (
        <Aux>
          <Element flexRow>
            <H1>{title}</H1>
            <VocabListToggleButton cardsExpanded={on} onToggle={toggle} />
          </Element>
          <Notice ids={reviewIds} isLocked={isLocked} />
          <VocabList
            ids={reviewIds}
            heading={title}
            itemType={on ? ITEM_TYPES.CARD : ITEM_TYPES.CHIP}
            withSrsColors
          />
        </Aux>
      )}
    />
  );
}

const mapStateToProps = (state, props) => ({
  reviewIds: selectVocabLevelReviewIds(state, props),
  isLocked: selectVocabLevelIsLocked(state, props),
});

VocabLevelContainer.propTypes = {
  ...VocabLevel.propTypes,
};

export function VocabLevelContainer(props) {
  return (
    <Loader
      id={props.id}
      uiDomain={`${UI_DOMAIN}.${props.id}`}
      selectShouldLoad={selectVocabLevelShouldLoad}
      selectIsLoading={selectVocabLevelIsLoading}
      selectLastLoad={selectVocabLevelLastLoad}
      selectError={selectVocabLevelError}
      load={vocab.level.load.request}
      render={({ isLoading, Spinner }) => (isLoading ? <Spinner /> : <VocabLevel {...props} />)}
    />
  );
}

export default connect(mapStateToProps)(VocabLevelContainer);
