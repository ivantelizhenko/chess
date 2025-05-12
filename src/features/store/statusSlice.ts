import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameOverType, SideColor, StateType } from '../types/StatusTypes';

const initialState: StateType = {
  isGameOver: { is: false, message: '', type: null },
  offerDraw: { from: null },
  side: null,
  id: null,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setGameOver(
      state,
      action: PayloadAction<{ message: string; type: GameOverType }>
    ) {
      state.isGameOver = {
        is: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    doSurrender(state) {
      const side = state.side === 'w' ? 'White' : 'Black';
      state.isGameOver = {
        is: true,
        message: `${side} surrender`,
        type: 'win',
      };
    },
    toOfferDrawSend(state) {
      state.offerDraw.from = state.side;
    },
    clearOfferDraw(state) {
      state.offerDraw.from = null;
    },
    addId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    reset() {
      return initialState;
    },
    setSide(state, action: PayloadAction<SideColor>) {
      state.side = action.payload;
    },
  },
});

export const {
  setGameOver,
  toOfferDrawSend,
  clearOfferDraw,
  addId,
  setSide,
  reset,
} = statusSlice.actions;

export default statusSlice.reducer;
