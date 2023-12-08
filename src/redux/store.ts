import {
  AnyAction,
  Store,
  ThunkDispatch,
  configureStore,
} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';
import {useDispatch} from 'react-redux';

const persisConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['pokeReducer'],
};

const persistedReducer = persistReducer(persisConfig, rootReducer);

const reduxInmmutableStateInvariant =
  require('redux-immutable-state-invariant').default();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    __DEV__
      ? [
          ...getDefaultMiddleware({serializableCheck: false}),
          reduxInmmutableStateInvariant,
        ]
      : getDefaultMiddleware({
          serializableCheck: false,
        }),
  devTools: true,
});

export const persistor = persistStore(store);

// 1. Get the root state's type from reducers
export type RootState = ReturnType<typeof store.getState>;

// 2. Create a type for thunk dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

// 3. Create a type for store using RootState and Thunk enabled dispatch
export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
//export type RootState = ReturnType<typeof store.getState>;
