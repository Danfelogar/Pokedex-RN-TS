import {combineReducers} from '@reduxjs/toolkit';
import pokeReducer from './slices/pokemons';

const rootReducer = combineReducers({
  pokeReducer,
});

export default rootReducer;
