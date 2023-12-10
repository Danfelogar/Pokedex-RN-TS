import React from 'react';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';

import {Home} from './Home';
import {mockPokeRootProps} from '../test/mocks/pokemonsMock';
import {render} from '../test/test-utils';

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

  beforeEach(() => {
    store = mockStore(mockPokeRootProps) as MockStoreEnhanced<RootState, {}>;
  });

  it('should render the title correctly', () => {
    const {getByText} = render(<Home />);
    const title = getByText('PokeDex');
    expect(title).toBeTruthy();
  });

  it('should render the total number of pokemons correctly', () => {
    const {getByText} = render(<Home />);
    const totalPokemonText = getByText(
      'There are more than 0 pokemons in the world, counter page: 0',
    );
    expect(totalPokemonText).toBeTruthy();
  });

  it('should render the list of pokemons correctly', () => {
    const {getByTestId} = render(<Home />);
    const pokemonList = getByTestId('pokemon-list');
    expect(pokemonList).toBeTruthy();
  });

  it('should render the loading indicator when there are more pokemons to load', async () => {
    const {findByTestId} = render(<Home />);
    const loadingIndicator = await findByTestId('loading-indicator-2');
    expect(loadingIndicator).toBeTruthy();
  });
});
