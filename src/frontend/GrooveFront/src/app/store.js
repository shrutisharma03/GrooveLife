import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import counterReducer from '../features/counter/counterSlice';
import queueReducer from './music_api/musicSlice';
import { musicApi } from './music_api/musicApi';
import authReducer from './auth_api/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        counter: counterReducer,
        queue: queueReducer,
        [musicApi.reducerPath]: musicApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(musicApi.middleware)
});

setupListeners(store.dispatch)