import {Dimensions} from 'react-native';

export const getOficialImg = (val: number | string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${val}.png`;
};

export const BASE_URL = 'https://pokeapi.co/api/v2';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
