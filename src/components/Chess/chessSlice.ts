import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from '../../utils/helpers';
import {
  BoardType,
  PieceColor,
  PieceFigures,
  PosibleMoveType,
  StateType,
} from './types/ChessTypes';

const initialState: StateType = {
  board: createBoard(),
  selectedTile: null,
  possibleMovesForPiece: [],
};

const chessSlice = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    setPieceToTile(
      state,
      action: PayloadAction<{
        column: BoardType['column'];
        row: BoardType['row'];
        color: PieceColor;
        name: PieceFigures;
      }>
    ) {
      state.board.find(
        tile =>
          tile.column === action.payload.column &&
          tile.row === action.payload.row
      )!.piece = { name: action.payload.name, color: action.payload.color };
    },
    removePieceFromTile(
      state,
      action: PayloadAction<{
        column: BoardType['column'];
        row: BoardType['row'];
      }>
    ) {
      state.board.find(
        tile =>
          tile.column === action.payload.column &&
          tile.row === action.payload.row
      )!.piece = null;
    },
    selectTile(
      state,
      action: PayloadAction<{
        column: BoardType['column'];
        row: BoardType['row'];
      }>
    ) {
      state.selectedTile = {
        column: action.payload.column,
        row: action.payload.row,
      };
    },
    clearSelectedTile(state) {
      state.selectedTile = null;
    },
    setPossibleMovesForPiece(state, action: PayloadAction<PosibleMoveType[]>) {
      state.possibleMovesForPiece = action.payload;
    },
  },
});

export const {
  setPieceToTile,
  removePieceFromTile,
  selectTile,
  clearSelectedTile,
  setPossibleMovesForPiece,
} = chessSlice.actions;

export default chessSlice.reducer;
