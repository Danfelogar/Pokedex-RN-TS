import {combineReducers} from '@reduxjs/toolkit';
import pokeReducer from './slices/pokemons';
import singlePokeReducer from './slices/singlePokemon';

const rootReducer = combineReducers({
  pokeReducer,
  singlePokeReducer,
});

export default rootReducer;
