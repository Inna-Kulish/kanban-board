import { configureStore } from '@reduxjs/toolkit';
import { issuesReducer } from './issues/issuesSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()