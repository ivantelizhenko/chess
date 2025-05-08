import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalWindowType, StateType } from '../types/UiTypes';

const initialState: StateType = {
  isOpenModalWindow: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
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

export const { openModalWindow, closeModalWindow } = uiSlice.actions;

export default uiSlice.reducer;
