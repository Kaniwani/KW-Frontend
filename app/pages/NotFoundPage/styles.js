import styled, { css } from 'styled-components';
import H1 from 'common/components/H1';
import H2 from 'common/components/H2';
import P from 'common/components/P';
import BGImg from 'common/components/BackgroundImg';

import { pink, greyDark } from 'common/styles/colors';
import { kilo, godzilla } from 'common/styles/typography';
import { media } from 'common/styles/media';

export const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

export const BackgroundImg = BGImg.extend`
  max-width: 75vmax;
  max-width: 700px;
  background-position: left bottom;
  background-size: contain;
  ${media().lg`
    background-position: 15% center;
    background-size: cover;
  `}
`;

export const Title = H1.extend`
  ${kilo}
  color: ${pink};
  ${media().md`
    ${godzilla}
    margin-left: auto;
    text-align: right;
  `}
`;

const textStyle = css`
  color: ${greyDark};
  ${media().md`
    max-width: 800px;
    margin-left: auto;
    text-align: right;
  `}
`;

export const Subtitle = H2.extend`
 ${textStyle}
`;

export const Text = P.extend`
  ${textStyle}
  font-weight: 600;
  font-style: italic;
`;
