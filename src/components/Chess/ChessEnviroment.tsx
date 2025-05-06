import styled from 'styled-components';
import ChessBoard from './ChessBoard';

import Buttons from './Buttons';
import Time from './Time';

function ChessEnviroment() {
  return (
    <Wrapper>
      <Time type="b">10:00</Time>
      <ChessBoard />
      <Time type="w">10:00</Time>
      <Buttons />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 3fr 1.5fr;
  grid-template-rows: auto minmax(0, 1fr) auto;
  grid-template-areas:
    '. timeBlack buttons'
    '. board buttons'
    '. timeWhite buttons';

  padding: 24px 64px;
  gap: 12px 32px;
  min-height: 0;
`;

export default ChessEnviroment;
