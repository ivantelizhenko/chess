import { Chess, Square } from 'chess.js';

const chess = new Chess();

export function showPossibleMovesForPiece(column: string, row: string) {
  const code = column + row;
  const possibleMoves = chess.moves({ square: code as Square, verbose: true });

  const result = possibleMoves.map(move => {
    return {
      from: move.from,
      to: move.to,
      name: move.san,
      attackedPiece: move.captured || null,
    };
  });

  return result;
}

export function doMove(codeFrom: string, codeTo: string) {
  const move = codeFrom + codeTo;

  chess.move(move);
}

export function showPrevMove() {
  const history = chess.history({ verbose: true });

  if (history.length > 1) {
    const firstPrevMove = history[history.length - 1];
    const secondPrevMove = history[history.length - 2];

    const prevTwoMoves = [
      { from: firstPrevMove.from, to: firstPrevMove.to },
      { from: secondPrevMove.from, to: secondPrevMove.to },
    ];
    return prevTwoMoves;
  }
  if (history.length > 0) {
    const { from, to } = history[history.length - 1];

    const prevMove = [{ from, to }];
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

export function getCurretnTurn() {
  return chess.turn();
}

export function fixPromotion(from: string, to: string, promotion: string) {
  const move = from + to + '=' + promotion;
  chess.undo();
  chess.move(move);
}
