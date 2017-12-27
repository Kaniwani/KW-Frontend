import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PieChart, Pie } from "recharts";

import { selectSrsCounts, selectSrsCountsExist } from "features/user/selectors";

import Element from "common/components/Element";
import SrsLegend from "./SrsLegend";
import renderActiveShape from "./renderActiveShape";

export class SrsChart extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        fill: PropTypes.string.isRequired,
      })
    ).isRequired,
    hasPositiveCount: PropTypes.bool.isRequired,
  };

  state = {
    activeIndex: 1,
  };

  onPieEnter = (data, index) => {
    this.setState({ activeIndex: index });
  };

  render() {
    const { hasPositiveCount, data } = this.props;
    return (
      <Element flexRow flexWrap flexCenter>
        {hasPositiveCount && (
          <PieChart width={275} height={225}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={this.onPieEnter}
              innerRadius={45}
              outerRadius={90}
              data={data}
              dataKey="value"
              labelLine={false}
              isAnimationActive={false}
            />
          </PieChart>
        )}
        <SrsLegend data={data} />
      </Element>
    );
  }
}

const mapStateToProps = (state) => ({
  data: selectSrsCounts(state),
  hasPositiveCount: selectSrsCountsExist(state),
});

export default connect(mapStateToProps)(SrsChart);
