import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from '../../utils/helpers';
import {
  PieceColor,
  StateType,
  TileType,
  TileWithoutPieceType,
} from './types/ChessTypes';

const initialState: StateType = {
  board: createBoard(),
  selectedTile: null,
  possibleMovesForPiece: [],
  prevMoves: [],
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
    },
    doCastling(
      state,
      action: PayloadAction<{ type: 'O-O' | 'O-O-O'; color: PieceColor }>
    ) {
      console.log('castling 2');

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
    setSelectedTile(state, action: PayloadAction<TileType>) {
      state.selectedTile = action.payload;
    },
    clearSelectedTile(state) {
      state.selectedTile = null;
    },
    setPossibleMovesForPiece(
      state,
      action: PayloadAction<{ to: string; name: string }[]>
    ) {
      state.possibleMovesForPiece = action.payload;
    },
    clearPossibleMoves(state) {
      state.possibleMovesForPiece = [];
    },
    setPrevMoves(state, action: PayloadAction<string[]>) {
      state.prevMoves = action.payload;
    },
  },
});

export const {
  movePiece,
  doCastling,
  setSelectedTile,
  clearSelectedTile,
  setPossibleMovesForPiece,
  clearPossibleMoves,
  setPrevMoves,
} = chessSlice.actions;

export default chessSlice.reducer;
