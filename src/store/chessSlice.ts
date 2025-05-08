import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from '../utils/helpers';
import {
  SideColor,
  PieceFigures,
  PossibleMoveData,
  PrevMoveObject,
  StateType,
  TileType,
  TileWithoutPieceType,
  ModalWindowType,
  GameOverType,
} from '../types/ChessTypes';
import { fixWrongPromotion, getCurretnTurn } from '../service/chess';

const initialState: StateType = {
  board: createBoard(),
  selectedTile: null,
  possibleMovesForPiece: [],
  prevTwoMoves: [],
  promotionPiece: null,
  turn: 'w',
  time: { white: 600, black: 600 },
  isGameOver: { is: false, message: '', type: null },
  side: 'w',
  isOpenModalWindow: null,
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

      // Закрити модальне вікно
      state.isOpenModalWindow = null;

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
    setGameOver(
      state,
      action: PayloadAction<{ message: string; type: GameOverType }>
    ) {
      state.isGameOver = {
        is: true,
        message: action.payload.message,
        type: action.payload.type,
      };
      state.isOpenModalWindow = 'gameOver';
    },
    doSurrender(state) {
      const side = state.side === 'w' ? 'White' : 'Black';
      state.isGameOver = {
        is: true,
        message: `${side} surrender`,
        type: 'win',
      };
    },
    openModalWindow(
      state,
      action: PayloadAction<Omit<ModalWindowType, 'null'>>
    ) {
      state.isOpenModalWindow = action.payload as ModalWindowType;
    },
    closeModalWindow(state) {
      state.isOpenModalWindow = null;
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
  setCurrentTurn,
  runTime,
  setGameOver,
  openModalWindow,
  closeModalWindow,
} = chessSlice.actions;

export default chessSlice.reducer;
