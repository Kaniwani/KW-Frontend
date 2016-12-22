import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 2em auto;
  width: 40px;
  height: 40px;
  position: relative;
  color: ${(props) => props.color ? props.color : '#999'}
`;

export default Wrapper;
