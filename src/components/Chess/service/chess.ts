import { Chess, Square } from 'chess.js';

const chess = new Chess();

export function showPossibleMovesForPiece(column: string, row: string) {
  const code = column + row;
  const possibleMoves = chess.moves({ square: code as Square, verbose: true });
  const result = possibleMoves.map(move => {
    return move.to;
  });
  const castling = possibleMoves
    .map(move => move.san)
    .filter(move => move.includes('0'));

  return [result, castling];
}

export function doMove(codeFrom: string, codeTo: string) {
  const move = codeFrom + codeTo;
  chess.move(move);
}

export function showPrevMove() {
  const history = chess.history({ verbose: true });

  if (history.length > 0) {
    const { from, to } = history[history.length - 1];
    const prevMove = [from, to];
    return prevMove;
  }
  return [];
}

export function showTileColor(code: string) {
  const color = chess.squareColor(code as Square);
  return color;
}

export function showGame() {
  console.log(chess.ascii());
}
