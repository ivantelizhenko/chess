import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from '../../utils/helpers';
import { StateType, TileType, TileWithoutPieceType } from './types/ChessTypes';

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
    selectTile(state, action: PayloadAction<TileType>) {
      state.selectedTile = action.payload;
    },
    clearSelectedTile(state) {
      state.selectedTile = null;
    },
    setPossibleMovesForPiece(state, action: PayloadAction<string[]>) {
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
  selectTile,
  clearSelectedTile,
  setPossibleMovesForPiece,
  clearPossibleMoves,
  setPrevMoves,
} = chessSlice.actions;

export default chessSlice.reducer;
