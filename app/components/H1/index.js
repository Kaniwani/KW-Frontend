import styled from 'styled-components';
import { fluidType } from 'shared/styles/utils';
import { minFontSize, mobileMod, desktopMod } from 'shared/styles/sizing';

// Modular scale
const mobileSize = +((mobileMod ** 4) * minFontSize).toPrecision(3);
const desktopSize = +((desktopMod ** 4) * minFontSize).toPrecision(3);

const H1 = styled.h1`
  ${fluidType(mobileSize, desktopSize)}
`;

export default H1;
