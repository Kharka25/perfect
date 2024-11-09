import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';

import toastReducer from './toast/toast';

const rootReducer = combineReducers({
  toast: toastReducer,
});

export const store = configureStore({reducer: rootReducer});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
