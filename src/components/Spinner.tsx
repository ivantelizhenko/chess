import styled, { keyframes } from 'styled-components';

function Spinner() {
  return <Wrapper />;
}

const rotation = keyframes`
to{
  transform: rotate(1turn);
}

`;

const Wrapper = styled.div`
  place-self: center;
  width: 10vw;
  height: 10vw;
  border: 10px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

export default Spinner;
