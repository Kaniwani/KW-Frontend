import styled, { css } from 'styled-components';
import { mix, lighten } from 'polished';

import { grey } from 'common/styles/colors';
import { epsilon } from 'common/styles/typography';
import { fastEaseQuad } from 'common/styles/animation';
import { resetButton } from 'common/styles/utils';
import { gutter } from 'common/styles/layout';

import A from 'common/components/A';

const buttonStyle = css`
  ${epsilon}
  appearance: none !important;
  display: inline-flex;
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  transition: all ${fastEaseQuad};
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ plainButton }) => plainButton ? css`
    ${resetButton}
  ` : css`
    ${gutter({ prop: 'margin' })}
    ${gutter({ prop: 'padding', position: 'vertical', mod: 1.5 })}
    ${gutter({ prop: 'padding', position: 'horizontal', mod: 3 })}
    border: 2px solid ${({ bgColor }) => bgColor};
    border-radius: 4px;
    min-width: 8em;

    &:disabled {
      cursor: not-allowed;
      background-color: ${({ bgColor }) => mix(0.5, bgColor, grey[8])};
      border-color: ${({ bgColor }) => mix(0.5, bgColor, grey[8])};
    }

    &:not(:disabled) {
      &:active,
      &:focus,
      &:hover {
        color: ${({ colorHover }) => colorHover};
        background-color: ${({ bgColorHover }) => bgColorHover};
        border-color: ${({ colorHover }) => colorHover};
      }

      &:active {
        color: ${({ color }) => color};
        background-color: ${({ bgColor }) => lighten(0.2, bgColor)};
      }
    }
  `}
`;

export const Anchor = styled(A)`
  ${buttonStyle}
`;

export const StyledButton = styled.button`
  ${buttonStyle}
`;
