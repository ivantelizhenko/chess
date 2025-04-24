import { Chess, Square } from 'chess.js';

const chess = new Chess();

export function showPossibleMovesForPiece(column: string, row: string) {
  const code = column + row;
  const posibleMoves = chess
    .moves({ square: code as Square, verbose: true })
    .map(move => move.to);

  return posibleMoves;
}

export function doMove(codeFrom: string, codeTo: string) {
  const move = codeFrom + codeTo;
  chess.move(move);
}

export function showGame() {
  console.log(chess.ascii());
}

export function showPrevMove() {
  const history = chess.history({ verbose: true });

  if (history.length > 0) {
    const { from, to } = history[history.length - 1];
    const prevMove = [from, to];
    console.log(prevMove);
    return prevMove;
  }
  return [];
}
