import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { selectVocabularyLevels } from './selectors';
import { getLevels } from './actions';
import Container from 'components/Container';
import Element from 'components/Element';
import List from 'components/List';
import A from 'components/A';
import H1 from 'components/H1';

const getLockedText = (item) => item.isLocked ? 'locked' : 'unlocked';

const Level = ({ item }) => (
  <Container tag="li" style={{ border: '1px solid grey' }}>
    <Element>level:{item.level}</Element>
    <Element>{getLockedText(item)}</Element>
    <Element>count:{item.count}</Element>
    {!item.isLocked && <A to={`/vocabulary/${item.level}`}>View Item</A>}
  </Container>
);

Level.propTypes = {
  item: PropTypes.instanceOf(Immutable.Iterable),
};

export class VocabularyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getLevels: PropTypes.func.isRequired,
    levels: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  }

  componentDidMount() {
    this.props.getLevels();
  }

  render() {
    return (
      <div>
        <Helmet
          title="Vocabulary"
          meta={[{ name: 'description', content: 'KaniWani Vocabulary' }]}
        />
        {/* TODO: breadcrumbs */}
        <Container>
          <H1>Vocabulary</H1>
          {(this.props.levels.size > 0) && <List items={this.props.levels} component={Level} />}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  levels: selectVocabularyLevels,
});

const mapDispatchToProps = (dispatch) => ({
  getLevels: () => dispatch(getLevels()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyPage);
