import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from '../utils/helpers';
import {
  PossibleMoveData,
  PrevMoveObject,
  StateType,
} from '../types/BoardTypes';
import { fixWrongPromotion } from '../service/chess';
import { SideColor } from '../types/StatusTypes';
import {
  PieceFigures,
  TileWithoutPieceType,
  TileWithPieceType,
} from '../chess/components/board/Tile/TileTypes';

const initialState: StateType = {
  board: createBoard(),
  selectedTile: null,
  possibleMovesForPiece: [],
  prevTwoMoves: [],
  promotionPiece: null,
};

const boardSlice = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    movePiece(
      state,
      action: PayloadAction<{
        selectedTile: TileWithPieceType;
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
      action: PayloadAction<{ type: 'O-O' | 'O-O-O'; color: SideColor }>
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
    doPromotion(
      state,
      action: PayloadAction<{
        name: Omit<PieceFigures, 'k' | 'p'>;
        color: SideColor;
      }>
    ) {
      const promotedPiece = action.payload;
      const [columnFrom, rowFrom] = state.prevTwoMoves.at(0)!.from;
      const [columnTo, rowTo] = state.prevTwoMoves.at(0)!.to;

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
    setSelectedTile(state, action: PayloadAction<TileWithPieceType>) {
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
  },
});

export const {
  movePiece,
  doCastling,
  doPromotion,
  setSelectedTile,
  clearSelectedTile,
  setPossibleMovesForPiece,
  clearPossibleMoves,
  setPrevTwoMoves,
} = boardSlice.actions;

export default boardSlice.reducer;
