import styled from 'styled-components';

import Tile from './Tile';
import { useAppSelector } from '../../store';

function ChessBoard() {
  const stateBoard = useAppSelector(state => state.chess.board);

  return (
    <Wrapper>
      {stateBoard.map(delegated => (
        <Tile key={delegated.column + delegated.row} {...delegated} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  height: 100%;
  width: 100%;
`;

export default ChessBoard;
