import React from 'react';
import {View, Text, Image, useColorScheme, StyleSheet} from 'react-native';
import {ISinglePokemon} from '../types/pokeTypes';
import {getOficialImg, windowWidth} from '../util/magicalString';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const PokemonCard = ({item}: {item: ISinglePokemon}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      key={item.id}
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? 'rgba(255, 255, 255, 0.7)'
            : Colors.lighter,
        },
      ]}>
      <Image source={{uri: getOficialImg(item.id)}} style={styles.wrapperImg} />
      <Text style={styles.titlePoke}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    borderRadius: 10,
    width: windowWidth * 0.44,
    marginBottom: 12,
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  wrapperImg: {width: '100%', height: 100, objectFit: 'contain'},
  titlePoke: {fontSize: 18, fontWeight: '800'},
});
