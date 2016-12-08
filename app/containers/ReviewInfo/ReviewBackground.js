import styled from 'styled-components';

import bg from 'shared/assets/img/backgrounds/reviews-800.png';
import bgMd from 'shared/assets/img/backgrounds/reviews-1200.png';
import bgXl from 'shared/assets/img/backgrounds/reviews.svg';

const ReviewBackground = styled.div`
  width: 100%;
  height: 100%;
  opacity: .9;
  background-color: #e5e5e5; /* image bg color, not used anywhere else hence no imported var name */
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto;

  @media(min-width: 600px) {
    background-size: contain;
    background-image: url(${bgMd});
  }

  @media(min-width: 1200px) {
    background-size: cover;
    background-image: url(${bgXl});
  }
`;

export default ReviewBackground;
