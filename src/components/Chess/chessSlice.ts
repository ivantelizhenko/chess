import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from '../../utils/helpers';
import { BoardType, PieceColor, PieceFigures } from './types/ChessTypes';

const initialState = {
  board: createBoard(),
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
  },
});

export const { setPieceToTile, removePieceFromTile } = chessSlice.actions;

export default chessSlice.reducer;
