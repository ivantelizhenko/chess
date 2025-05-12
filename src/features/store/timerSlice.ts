import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateType } from '../types/TimerTypes';
import { getCurretnTurn } from '../service/chess';
import { SideColor } from '../types/StatusTypes';

const initialState: StateType = {
  time: { white: 0, black: 0 },
  extraSeconds: 0,
  turn: 'w',
  isStartTimer: false,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setExtraSeconds(state, action: PayloadAction<number>) {
      state.extraSeconds = action.payload;
    },
    addExtraSeconds(state, action: PayloadAction<SideColor>) {
      const side = action.payload === 'w' ? 'white' : 'black';
      state.time[side] += state.extraSeconds;
    },
    runTime(state) {
      if (state.turn === 'w') {
        state.time.white -= 1;
      }
      if (state.turn === 'b') {
        state.time.black -= 1;
      }
    },
    setCurrentTurn(state) {
      state.turn = getCurretnTurn();
    },
    startTimer(state) {
      state.isStartTimer = true;
    },
    setActiveTime(
      state,
      action: PayloadAction<{ timeWhite: number; timeBlack: number }>
    ) {
      state.time = {
        white: action.payload.timeWhite,
        black: action.payload.timeBlack,
      };
    },
    reset() {
      return initialState;
    },
  },
});

export const {
  runTime,
  setCurrentTurn,
  setExtraSeconds,
  addExtraSeconds,
  startTimer,
  setActiveTime,
  reset,
} = timerSlice.actions;

export default timerSlice.reducer;
