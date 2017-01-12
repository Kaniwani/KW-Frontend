import React, { PropTypes } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import cuid from 'cuid';
import ICONS from './constants';

const Wrapper = styled.span`
  display: ${({ inline }) => inline ? 'inline-' : ''}block;
  vertical-align: middle;
  align-self: center;
  position: relative;
  width: ${({ iconSize }) => iconSize}; /*CSS instead of html width attr to support non-pixel units*/
  height: ${({ iconSize }) => iconSize}; /*Prevents scaling issue in IE*/
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0);
  transition: all 200ms ease-in-out;
  color: ${({ iconColor }) => iconColor};
`;

const SVG = styled.svg`
  display: block;
  pointer-events: none;
  transform-origin: 50% 50% 0px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  fill: currentColor;
`;

const tooltipDefaults = {
  position: 'right',
  showDelay: 0,
  hideDelay: 0,
};

// TODO: create HoC as "withTooltip" to simplify this icon component
const Icon = ({ color, size, name, className, tooltip, inline, ...rest }) => {
  // NOTE: <ReactTooltip /> must be present in a parent component (pref root) for tooltips to show!
  const tooltipOptions = Object.assign(
    {},
    tooltipDefaults,
    tooltip,
    { id: cuid() },
  );
  return (
    <Wrapper
      inline={inline}
      className={className}
      iconColor={color}
      iconSize={size}
      data-tip={tooltipOptions.text}
      data-for={tooltipOptions.id}
      data-place={tooltipOptions.position}
      data-delay-show={tooltipOptions.showDelay}
      data-delay-hide={tooltipOptions.hideDelay}
    >
      { tooltipOptions.text && <ReactTooltip id={tooltipOptions.id} /> }
      <SVG
        title={name}
        width="100%"
        height="100%"
        viewBox={ICONS[name].viewBox}
        {...rest}
      >
        {ICONS[name].path}
      </SVG>
    </Wrapper>
  );
};

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  preserveAspectRatio: PropTypes.string.isRequired,
  tooltip: PropTypes.shape({
    text: PropTypes.string.isRequired,
    position: PropTypes.string,
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
  }),
  inline: PropTypes.bool,
};

Icon.defaultProps = {
  color: 'currentColor',
  size: '1em',
  preserveAspectRatio: 'xMidYMid meet',
  inline: true,
};

export default Icon;
