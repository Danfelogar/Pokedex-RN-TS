import React, {useId} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {StandarWrapper} from '../components/standarWrapper';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {PokemonCard} from '../components/pokemonCard';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

export const FavoriteListPoke = () => {
  const flatListID = useId();

  const {favoritesPokeList} = useSelector(
    (state: RootState) => state.pokeReducer,
  );

  return (
    <StandarWrapper>
      <GestureHandlerRootView style={styles.container}>
        <Text style={styles.textTitle}>Favorite list</Text>
        <FlatList
          testID="pokemon-favorite-list"
          columnWrapperStyle={{justifyContent: 'space-around'}}
          style={{width: '100%', margin: 10}}
          key={flatListID}
          data={favoritesPokeList}
          renderItem={({item}) => <PokemonCard item={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </GestureHandlerRootView>
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
