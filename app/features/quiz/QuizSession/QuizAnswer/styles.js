import styled, { css } from 'styled-components';
import { placeholder } from 'polished';

import StreakIcon from 'common/components/StreakIcon';
import IconButton from 'common/components/IconButton';

import { visuallyHidden } from 'common/styles/utils';
import { shadowBox, innerMedium } from 'common/styles/shadows';
import { kilo } from 'common/styles/typography';
import { gutter } from 'common/styles/layout';
import { fastEaseQuad, shake } from 'common/styles/animation';
import { transparent, white, whiteLight, whiteDark, black, yellowOrange, red, green } from 'common/styles/colors';
import { backgroundImageColor } from 'features/quiz/QuizSession/styles';

/* eslint-disable indent */
export const AnswerWrapper = styled.div`
  position: relative;
  display: flex;
  color: currentColor;
  background-color: ${whiteLight};
  ${shadowBox}
`;

export const Form = styled.form`
  ${gutter()}
  ${kilo}
  max-width: 100%;
  background-color: ${backgroundImageColor};
  color: ${({ marked, valid }) => marked && valid ? white : black};
  border: 0;
  border-radius: 0;
  outline: none;
  appearance: none;
  z-index: 2;
  overflow-x: hidden; /* shake animation creates scrollbar otherwise */

  & ${AnswerWrapper} {
    ${bgColorMixin}
  }
`;

export const Label = styled.label`
  ${visuallyHidden}
`;

export const Input = styled.input`
  ${kilo}
  display: block;
  width: 100%;
  margin: 0;
  outline: none;
  border: 0;
  line-height: 1.75;
  min-height: 1.9em;
  text-align: center;
  color: currentColor;
  box-shadow: ${innerMedium};
  background-color: inherit;

  /* leave some space for streak icon / submit button */
  padding-left: 1.75em;
  padding-right: 1.75em;
  transition: all ${fastEaseQuad};

  &:placeholder-shown {
    ${placeholder({ color: whiteDark })} /* focused input placeholder text color */
  }

  ${({ marked, valid }) => {
    const color = valid ? white : black;
    return marked && css`
      color: ${color}; /* Override Android / IE font color change */
      -webkit-opacity: 1; /* Override iOS opacity change affecting text & background color */
      ${placeholder({ color })} /* Override browser-forced color */
      &:placeholder-shown {
        ${placeholder({ color })} /* Override browser-forced color */
      }
    `;
  }}

  ${({ marked, valid }) => marked && !valid && css`
    animation: ${shake} .35s ease-in-out;
  `}

  &:focus {
    outline: none;
  }

  /*hide stupid X on IE*/
  &::-ms-clear {
    display: none;
  }
`;

const ActionButton = styled(IconButton)`
  ${kilo}
  position: absolute;
  display: block;
  color: currentColor;
  background-color: ${transparent};
  transition: all ${fastEaseQuad};
  align-self: center;
  z-index: 2;
  opacity: .9;
  &:hover {
    opacity: 1;
  }
`;

export const SubmitButton = ActionButton.extend`
  right: .1em;
`;

export const IgnoreButton = ActionButton.extend`
  left: .1em;
`;

export const Streak = styled(StreakIcon)`
  display: block;
  position: absolute;
  top: 50%;
  left: .35em;
  opacity: .8;
  transform: translateY(-50%);
  transition: all ${fastEaseQuad};
  z-index: 2;
`;


function bgColorMixin({
  marked,
  valid,
  correct,
  incorrect,
}) {
  switch (true) {
    case marked && !valid: return `background-color: ${yellowOrange};`;
    case correct: return `background-color: ${green};`;
    case incorrect: return `background-color: ${red};`;
    default: return false;
  }
}
