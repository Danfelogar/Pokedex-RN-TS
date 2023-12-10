import React, {useEffect, useId} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../redux/store';
import {getPokemonsAsync} from '../redux/slices/pokemons';
import {PokemonCard} from '../components/pokemonCard';
import {StandarWrapper} from '../components/standarWrapper';

export const Home = () => {
  const flatListID = useId();
  const dispatch = useAppDispatch();
  const {totalPokemon, pokeList, page} = useSelector(
    (state: RootState) => state.pokeReducer,
  );
  useEffect(() => {
    if (page === 0) {
      dispatch(getPokemonsAsync(1));
    }
  }, []);

  const getMorePokemons = () => {
    if (page !== 0) {
      dispatch(getPokemonsAsync(page + 1));
    }
  };
  console.log({totalPokemon}, pokeList.length);
  return (
    <StandarWrapper>
      <View style={styles.container}>
        <Text style={styles.textTitle}>PokeDex</Text>
        <Text style={{fontSize: 15, marginBottom: 22}}>
          There are more than {totalPokemon} pokemons in the world, counter
          page: {page}
        </Text>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-around'}}
          style={{width: '100%', margin: 10}}
          key={flatListID}
          data={pokeList}
          renderItem={({item}) => <PokemonCard item={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          onEndReached={() => {
            if (totalPokemon > pokeList.length) {
              getMorePokemons();
            }
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View
              style={{
                width: '100%',
                display: totalPokemon > pokeList.length ? 'flex' : 'none',
                justifyContent: 'center',
              }}>
              <ActivityIndicator />
            </View>
          }
        />
      </View>
    </StandarWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
  },
  textTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
