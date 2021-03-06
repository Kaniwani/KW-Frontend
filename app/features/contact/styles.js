import styled from 'styled-components';

import { gutter } from 'common/styles/layout';
import { zeta } from 'common/styles/typography';
import { borderRadius } from 'common/styles/sizing';
import { white, grey, orange } from 'common/styles/colors';

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: inherit;
  align-content: inherit;
  align-items: inherit;
  width: 100%;
  max-width: 900px;
  min-width: 320px;
`;

export const Input = styled.input`
  border: 2px solid ${white[7]};
  border-radius: ${borderRadius};
  &:focus {
    border-color: ${grey[2]};
  }
`;

export const TextArea = styled.textarea`
  ${gutter({ type: 'outer', prop: 'padding' })}
  ${gutter({ prop: 'margin' })}
  ${zeta}
  width: 100%;
  max-width: 100%;
  resize: none;
  border-radius: ${borderRadius};

  &::placeholder {
    color: ${grey[5]};
  }

  &:not(:focus) {
    border: 1px dashed ${grey[2]};
  }
`;

export const Controls = styled.div`
  ${gutter({ position: 'vertical' })};
  ${gutter({ position: 'horizontal', mod: 2 })};
  flex: 1 0 100%;
`;

export const Block = styled.div`
  ${gutter()}
  display: flex;
  flex-flow: column nowrap;
`;

export const Label = styled.label`
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  align-items: center;
  & > * {
    ${gutter()}
    display: block;
  }
`;

export const Note = styled.div`
  ${gutter()}
  font-style: italic;
`;

export const ValidationMessage = styled.div`
  ${gutter()}
  flex: 1 0 100%;
  font-size: .9em;
  font-style: italic;
  color: ${orange[5]};
`;
