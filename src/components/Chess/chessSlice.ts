import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const chessSlice = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    // addItem(state, action) {
    //   // payload = newItem
    //   state.cart.push(action.payload);
    // },
  },
});

export const x = chessSlice.actions;

export default chessSlice.reducer;
