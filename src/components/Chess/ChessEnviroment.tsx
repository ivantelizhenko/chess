import styled from 'styled-components';
import ChessBoard from './ChessBoard';

import Buttons from './Buttons';
import Time from './Time';
import { useAppSelector } from '../../store/store';
import { convertTime } from '../../utils/helpers';

function ChessEnviroment() {
  const { white, black } = useAppSelector(state => state.chess.time);

  const blackTime = convertTime(black);
  const whiteTime = convertTime(white);

  return (
    <Wrapper>
      <Time type="b">{blackTime}</Time>
      <ChessBoard />
      <Time type="w">{whiteTime}</Time>
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
