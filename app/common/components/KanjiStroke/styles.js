
import styled from 'styled-components';
import IconButton from 'common/components/IconButton';

import { gutter } from 'common/styles/layout';

export const Wrapper = styled.div`
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const Canvas = styled.div`
  ${gutter()};
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export const Controls = styled.div`
  ${gutter({ position: 'bottom' })}
  display: flex;
  justify-content: center;
`;

export const ControlButton = styled(IconButton)`
  ${gutter({ position: 'horizontal', mod: 3 })}
  ${({ disabled }) => disabled && 'opacity: .5;'}
`;
