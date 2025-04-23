import { Chess, Square } from 'chess.js';

const chess = new Chess();

export function showPossibleMovesForPiece(column: string, row: string) {
  const code = column + row;
  const posibleMoves = chess.moves({ square: code as Square });

  return posibleMoves;
}

export function doMove(codeFrom: string, codeTo: string) {
  const move = codeFrom + codeTo;
  chess.move(move);
}

export function showGame() {
  console.log(chess.ascii());
}
