import { configureStore } from '@reduxjs/toolkit';
import { UserSlice } from './Slices/UserSlice';
import { TaskSlice } from './Slices/TaskSlice';


export const store = configureStore({
    reducer: {
        user:UserSlice.reducer,
        task:TaskSlice.reducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

