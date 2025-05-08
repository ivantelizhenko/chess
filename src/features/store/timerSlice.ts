import { createSlice } from '@reduxjs/toolkit';
import { StateType } from '../types/TimerTypes';
import { getCurretnTurn } from '../service/chess';

const initialState: StateType = {
  time: { white: 600, black: 600 },
  turn: 'w',
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
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
  },
});

export const { runTime, setCurrentTurn } = timerSlice.actions;

export default timerSlice.reducer;
