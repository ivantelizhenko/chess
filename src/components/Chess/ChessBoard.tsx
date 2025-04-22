import styled from 'styled-components';
import Tile from './Tile';
import { BoardType } from './ChessTypes';

const startedBoard: BoardType[] = [
  { row: '8', column: 'a', piece: { name: 'r', color: 'b' } },
  { row: '8', column: 'b', piece: { name: 'n', color: 'b' } },
  { row: '8', column: 'c', piece: { name: 'b', color: 'b' } },
  { row: '8', column: 'd', piece: { name: 'q', color: 'b' } },
  { row: '8', column: 'e', piece: { name: 'k', color: 'b' } },
  { row: '8', column: 'f', piece: { name: 'b', color: 'b' } },
  { row: '8', column: 'g', piece: { name: 'n', color: 'b' } },
  { row: '8', column: 'h', piece: { name: 'r', color: 'b' } },
  { row: '7', column: 'a', piece: { name: 'p', color: 'b' } },
  { row: '7', column: 'b', piece: { name: 'p', color: 'b' } },
  { row: '7', column: 'c', piece: { name: 'p', color: 'b' } },
  { row: '7', column: 'd', piece: { name: 'p', color: 'b' } },
  { row: '7', column: 'e', piece: { name: 'p', color: 'b' } },
  { row: '7', column: 'f', piece: { name: 'p', color: 'b' } },
  { row: '7', column: 'g', piece: { name: 'p', color: 'b' } },
  { row: '7', column: 'h', piece: { name: 'p', color: 'b' } },
  { row: '6', column: 'a', piece: null },
  { row: '6', column: 'b', piece: null },
  { row: '6', column: 'c', piece: null },
  { row: '6', column: 'd', piece: null },
  { row: '6', column: 'e', piece: null },
  { row: '6', column: 'f', piece: null },
  { row: '6', column: 'g', piece: null },
  { row: '6', column: 'h', piece: null },
  { row: '5', column: 'a', piece: null },
  { row: '5', column: 'b', piece: null },
  { row: '5', column: 'c', piece: null },
  { row: '5', column: 'd', piece: null },
  { row: '5', column: 'e', piece: null },
  { row: '5', column: 'f', piece: null },
  { row: '5', column: 'g', piece: null },
  { row: '5', column: 'h', piece: null },
  { row: '4', column: 'a', piece: null },
  { row: '4', column: 'b', piece: null },
  { row: '4', column: 'c', piece: null },
  { row: '4', column: 'd', piece: null },
  { row: '4', column: 'e', piece: null },
  { row: '4', column: 'f', piece: null },
  { row: '4', column: 'g', piece: null },
  { row: '4', column: 'h', piece: null },
  { row: '3', column: 'a', piece: null },
  { row: '3', column: 'b', piece: null },
  { row: '3', column: 'c', piece: null },
  { row: '3', column: 'd', piece: null },
  { row: '3', column: 'e', piece: null },
  { row: '3', column: 'f', piece: null },
  { row: '3', column: 'g', piece: null },
  { row: '3', column: 'h', piece: null },
  { row: '2', column: 'a', piece: { name: 'p', color: 'w' } },
  { row: '2', column: 'b', piece: { name: 'p', color: 'w' } },
  { row: '2', column: 'c', piece: { name: 'p', color: 'w' } },
  { row: '2', column: 'd', piece: { name: 'p', color: 'w' } },
  { row: '2', column: 'e', piece: { name: 'p', color: 'w' } },
  { row: '2', column: 'f', piece: { name: 'p', color: 'w' } },
  { row: '2', column: 'g', piece: { name: 'p', color: 'w' } },
  { row: '2', column: 'h', piece: { name: 'p', color: 'w' } },
  { row: '1', column: 'a', piece: { name: 'r', color: 'w' } },
  { row: '1', column: 'b', piece: { name: 'n', color: 'w' } },
  { row: '1', column: 'c', piece: { name: 'b', color: 'w' } },
  { row: '1', column: 'd', piece: { name: 'q', color: 'w' } },
  { row: '1', column: 'e', piece: { name: 'k', color: 'w' } },
  { row: '1', column: 'f', piece: { name: 'b', color: 'w' } },
  { row: '1', column: 'g', piece: { name: 'n', color: 'w' } },
  { row: '1', column: 'h', piece: { name: 'r', color: 'w' } },
];
function ChessBoard() {
  // const chess = new Chess();
  // const posibleMoves = chess.moves()

  return (
    <Wrapper>
      {startedBoard.map(delegated => (
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
