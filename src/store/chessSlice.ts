import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from '../utils/helpers';
import {
  PieceColor,
  PieceFigures,
  PossibleMoveData,
  PrevMoveObject,
  StateType,
  TileType,
  TileWithoutPieceType,
} from '../types/ChessTypes';
import { fixWrongPromotion, getCurretnTurn } from '../service/chess';

const initialState: StateType = {
  board: createBoard(),
  selectedTile: null,
  possibleMovesForPiece: [],
  prevTwoMoves: [],
  promotion: { isOpen: false, selectedPiece: null },
  turn: 'w',
  time: { white: 600, black: 600 },
  isGameOver: { is: false, message: '' },
};

const chessSlice = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    movePiece(
      state,
      action: PayloadAction<{
        selectedTile: TileType;
        attackedTile: TileWithoutPieceType;
      }>
    ) {
      const { selectedTile, attackedTile } = action.payload;

      // Ставимо фігуру на нову клітинку
      state.board.find(
        tile =>
          tile.column === attackedTile.column && tile.row === attackedTile.row
      )!.piece = {
        name: selectedTile.piece.name,
        color: selectedTile.piece.color,
      };

      // Видаляємо фігуру з її минулої клітинки
      state.board.find(
        tile =>
          tile.column === selectedTile.column && tile.row === selectedTile.row
      )!.piece = null;

      // En passant
      const prevMove = state.prevTwoMoves.at(1)!;
      const isWhiteEnPassant =
        selectedTile.piece.color === 'w' && selectedTile.row === '5';
      const isBlackEnPassant =
        selectedTile.piece.color === 'b' && selectedTile.row === '4';
      const isPawnFirstTwoTileMove = +prevMove?.to[1] - +prevMove?.from[1];

      if (prevMove?.piece === 'p') {
        if (
          (isWhiteEnPassant && isPawnFirstTwoTileMove === -2) ||
          (isBlackEnPassant && isPawnFirstTwoTileMove === 2)
        ) {
          const [column, row] = prevMove.to.split('');
          state.board.find(
            tile => tile.column === column && tile.row === row
          )!.piece = null;
        }
      }
    },
    doCastling(
      state,
      action: PayloadAction<{ type: 'O-O' | 'O-O-O'; color: PieceColor }>
    ) {
      const isOO = action.payload.type === 'O-O';
      const row = action.payload.color === 'w' ? '1' : '8';

      // Перемістити короля
      state.board.find(
        tile => tile.column === (isOO ? 'g' : 'c') && tile.row === row
      )!.piece = {
        name: 'k',
        color: action.payload.color,
      };

      state.board.find(tile => tile.column === 'e' && tile.row === row)!.piece =
        null;

      // Перемістити туру
      state.board.find(
        tile => tile.column === (isOO ? 'f' : 'd') && tile.row === row
      )!.piece = {
        name: 'r',
        color: action.payload.color,
      };

      state.board.find(
        tile => tile.column === (isOO ? 'h' : 'a') && tile.row === row
      )!.piece = null;
    },
    openPromotionWindow(state) {
      state.promotion.isOpen = true;
    },
    doPromotion(
      state,
      action: PayloadAction<{
        name: Omit<PieceFigures, 'k' | 'p'>;
        color: PieceColor;
      }>
    ) {
      const promotedPiece = action.payload;
      const [columnFrom, rowFrom] = state.prevTwoMoves.at(0)!.from;
      const [columnTo, rowTo] = state.prevTwoMoves.at(0)!.to;

      // Закрити модальне вікно
      state.promotion.isOpen = false;

      // Ставимо фігуру на нову клітинку
      state.board.find(
        tile => tile.column === columnTo && tile.row === rowTo
      )!.piece = {
        name: promotedPiece.name as PieceFigures,
        color: promotedPiece.color,
      };

      // Видаляємо фігуру з її минулої клітинки
      state.board.find(
        tile => tile.column === columnFrom && tile.row === rowFrom
      )!.piece = null;

      // Виправляю в chess автоматичний promotion на вибраний
      fixWrongPromotion(
        columnFrom + rowFrom,
        columnTo + rowTo,
        promotedPiece.name as string
      );
    },
    setSelectedTile(state, action: PayloadAction<TileType>) {
      state.selectedTile = action.payload;
    },
    clearSelectedTile(state) {
      state.selectedTile = null;
    },
    setPossibleMovesForPiece(state, action: PayloadAction<PossibleMoveData[]>) {
      state.possibleMovesForPiece = action.payload;
    },
    clearPossibleMoves(state) {
      state.possibleMovesForPiece = [];
    },
    setPrevTwoMoves(state, action: PayloadAction<PrevMoveObject[]>) {
      state.prevTwoMoves = action.payload;
    },
    setCurrentTurn(state) {
      state.turn = getCurretnTurn();
    },
    runTime(state) {
      if (state.turn === 'w') {
        state.time.white -= 1;
      }
      if (state.turn === 'b') {
        state.time.black -= 1;
      }
    },
    setGameOver(state, action: PayloadAction<string>) {
      state.isGameOver = { is: true, message: action.payload };
    },
  },
});

export const {
  movePiece,
  doCastling,
  openPromotionWindow,
  doPromotion,
  setSelectedTile,
  clearSelectedTile,
  setPossibleMovesForPiece,
  clearPossibleMoves,
  setPrevTwoMoves,
  setCurrentTurn,
  runTime,
  setGameOver,
} = chessSlice.actions;

export default chessSlice.reducer;
