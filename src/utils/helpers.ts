import {
  BoardType,
  PieceColor,
  PieceFigures,
} from '../components/Chess/types/ChessTypes';

export function createBoard() {
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

  return startedBoard;
}

export function fromStringToObject(data: string) {
  const entries = data
    .split(',')
    .map(item => item.trim())
    .map(item => item.split(':').map(part => part.trim()));
  const result = Object.fromEntries(entries);

  return result;
}

export function transformFromMyAppToChessLibraryRules(
  column: BoardType['column'],
  row: BoardType['row'],
  name?: PieceFigures,
  color?: PieceColor
) {
  const code = column + row;
  if (name && color) {
    const pieceName = name === 'p' ? '' : name;
    const pieceNameWithColor =
      color === 'w' ? pieceName.toUpperCase() : pieceName;
    const codeWithPiece = pieceNameWithColor + code;

    return codeWithPiece;
  } else return code;
}
