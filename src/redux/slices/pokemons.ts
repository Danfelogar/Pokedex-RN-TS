import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IPokemonRes, ISinglePokemon} from '../../types/pokeTypes';
import {BASE_URL} from '../../util/magicalString';
import {store} from '../store';

interface IStatePoke {
  pokeList: ISinglePokemon[];
  isShowPokemonImg: boolean;
  favoritesPokeList: ISinglePokemon[];
  page: number;
  limit: number;
  totalPokemon: number;
}

const initial_state: IStatePoke = {
  pokeList: [],
  isShowPokemonImg: false,
  favoritesPokeList: [],
  page: 0,
  limit: 10,
  totalPokemon: 0,
};

const pokeReducer = createSlice({
  name: 'pokeReducer',
  initialState: initial_state,
  reducers: {
    getPokemons: (
      state: IStatePoke,
      action: PayloadAction<ISinglePokemon[]>,
    ) => {
      //state.pokeList = [];
      state.pokeList = [...state.pokeList, ...action.payload];
    },
    setShowPokemonImg: (state: IStatePoke, action: PayloadAction<boolean>) => {
      state.isShowPokemonImg = action.payload;
    },
    setPage: (state: IStatePoke, action: PayloadAction<number>) => {
      //state.page = 0;
      state.page = action.payload;
    },
    setCountPokes: (state: IStatePoke, action: PayloadAction<number>) => {
      //state.totalPokemon = 20;
      state.totalPokemon = action.payload;
    },
    setAddFavoritesPokeList: (
      state: IStatePoke,
      action: PayloadAction<ISinglePokemon>,
    ) => {
      state.favoritesPokeList = [...state.favoritesPokeList, action.payload];
    },
    setDeleteFavoritesPokeList: (
      state: IStatePoke,
      action: PayloadAction<number>,
    ) => {
      state.favoritesPokeList = state.favoritesPokeList.filter(
        poke => poke.id !== action.payload.toString(),
      );
    },
  },
});

export const {
  getPokemons,
  setShowPokemonImg,
  setPage,
  setCountPokes,
  setAddFavoritesPokeList,
  setDeleteFavoritesPokeList,
} = pokeReducer.actions;

export const getPokemonsAsync = createAsyncThunk(
  'pokeReducer/getPokemonsAsync',
  async (pageVal: number, thunkApi) => {
    const {limit, page} = store.getState().pokeReducer;
    const pageTarget = pageVal <= 1 ? 0 : pageVal * 10;
    console.log({page, pageTarget});
    if (page > pageTarget) {
      return;
    }
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${pageTarget}`,
    );
    const {count, results} = (await response.json()) as IPokemonRes;

    const newData = results.map(poke => {
      return {
        ...poke,
        id: poke.url.split('/')[6],
      };
    });
    thunkApi.dispatch(setCountPokes(count));
    thunkApi.dispatch(setPage(page + 1));
    thunkApi.dispatch(getPokemons(newData));
  },
);

export default pokeReducer.reducer;
