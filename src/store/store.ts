import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/store/boardSlice';
import uiReducer from '../features/store/uiSlice';
import timerReducer from '../features/store/timerSlice';
import statusReducer from '../features/store/statusSlice';
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    board: boardReducer,
    ui: uiReducer,
    timer: timerReducer,
    status: statusReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
