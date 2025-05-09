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
    setTime(state, action: PayloadAction<string>) {
      const [minutes, extraSeconds] = action.payload
        .split(' + ')
        .map(string => +string);

      state.extraSeconds = extraSeconds;
      state.time = { white: minutes * 60, black: minutes * 60 };
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
  },
});

export const { runTime, setCurrentTurn, setTime, addExtraSeconds } =
  timerSlice.actions;

export default timerSlice.reducer;
