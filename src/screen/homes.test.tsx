import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import {Home} from './Home';

interface RootState {
  pokeReducer: {
    totalPokemon: number;
    pokeList: {id: string; name: string}[];
    page: number;
  };
}

const mockStore = configureStore([]);

describe('Home Component', () => {
  let store: MockStoreEnhanced<RootState, {}>;
  let component: React.ReactElement;

  beforeEach(() => {
    store = mockStore({
      pokeReducer: {
        totalPokemon: 150,
        pokeList: [
          {id: '1', name: 'Bulbasaur'},
          {id: '2', name: 'Charmander'},
          {id: '3', name: 'Squirtle'},
        ],
        page: 1,
      },
    }) as MockStoreEnhanced<RootState, {}>;

    component = (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  it('should render the title correctly', () => {
    const {getByText} = render(component);
    const title = getByText('PokeDex');
    expect(title).toBeTruthy();
  });

  it('should render the total number of pokemons correctly', () => {
    const {getByText} = render(component);
    const totalPokemonText = getByText(
      'There are more than 150 pokemons in the world, counter page: 1',
    );
    expect(totalPokemonText).toBeTruthy();
  });

  it('should render the list of pokemons correctly', () => {
    const {getByTestId} = render(component);
    const pokemonList = getByTestId('pokemon-list');
    expect(pokemonList).toBeTruthy();
  });

  it('should render the loading indicator when there are more pokemons to load', () => {
    const {getByTestId} = render(component);
    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator).toBeTruthy();
  });

  it('should dispatch the getPokemonsAsync action when the component mounts', () => {
    render(component);
    const actions = store.getActions();
    expect(actions).toEqual([{type: 'pokemons/getPokemonsAsync', payload: 1}]);
  });

  it('should dispatch the getPokemonsAsync action when reaching the end of the list', () => {
    const {getByTestId} = render(component);
    const pokemonList = getByTestId('pokemon-list');
    fireEvent.scroll(pokemonList, {contentOffset: {y: 100}});
    const actions = store.getActions();
    expect(actions).toEqual([{type: 'pokemons/getPokemonsAsync', payload: 2}]);
  });
});
