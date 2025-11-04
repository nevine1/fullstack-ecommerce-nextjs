import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './rootReducer';
import storage from 'redux-persist/lib/storage';

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem() {
    return Promise.resolve(null);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storageFallback = typeof window !== 'undefined' ? storage : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage: storageFallback,
  whitelist: ['users'], // نحفظ فقط بيانات المستخدم
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
