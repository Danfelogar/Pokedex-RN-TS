import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';

import {RootStackMainParams} from '../navigation/navigationMain';
import {LoadingScreen} from '../components/loadingScreen';
import {RootState, useAppDispatch} from '../redux/store';
import {getOficialImg, windowHeight, windowWidth} from '../util/magicalString';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colorByType} from '../util/typeColor';
import {
  setAddFavoritesPokeList,
  setDeleteFavoritesPokeList,
} from '../redux/slices/pokemons';

interface Props extends StackScreenProps<RootStackMainParams, 'Details'> {}

export const Details = ({route, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const {isLoading, singlePokemon} = useSelector(
    (state: RootState) => state.singlePokeReducer,
  );

  const {favoritesPokeList} = useSelector(
    (state: RootState) => state.pokeReducer,
  );

  const isFavoritePoke = favoritesPokeList?.find(
    poke => poke.id === singlePokemon?.id?.toString(),
  );

  const changeFavoritePoke = () => {
    if (favoritesPokeList.length < 6) {
      if (isFavoritePoke) {
        return dispatch(setDeleteFavoritesPokeList(singlePokemon.id));
      } else {
        return dispatch(
          setAddFavoritesPokeList({
            id: singlePokemon.id.toString(),
            name: singlePokemon.name,
            url: singlePokemon.weight.toString(),
          }),
        );
      }
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      }}>
      <StatusBar
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
        showHideTransition="slide"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.containerForFillScreen}>
          <StatusBar
            backgroundColor={
              colorByType[
                singlePokemon.types[0].type
                  .name as unknown as keyof typeof colorByType
              ]
            }
            showHideTransition="slide"
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          />
          <View
            style={{
              ...styles.decoratorHeader,
              width: windowWidth * 1.2,
              height: windowHeight * 0.4,
              backgroundColor:
                colorByType[
                  singlePokemon.types[0].type
                    .name as unknown as keyof typeof colorByType
                ],
              borderBottomLeftRadius: windowWidth * 0.6,
              borderBottomRightRadius: windowWidth * 0.6,
            }}
          />
          <SafeAreaView style={styles.safeAreaContent}>
            <View style={styles.headerContent}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={23}
                  color={isDarkMode ? Colors.darker : Colors.lighter}
                />
              </TouchableOpacity>
              <Text style={styles.textTitle}>{singlePokemon.name}</Text>
            </View>
            <Image
              source={{uri: getOficialImg(singlePokemon.id)}}
              style={{...styles.wrapperImg, height: windowHeight * 0.36}}
            />
            <View style={styles.containerType}>
              {singlePokemon.types.map((item, index) => (
                <View
                  key={index}
                  style={{
                    ...styles.wrapperTypes,
                    backgroundColor:
                      colorByType[
                        item.type.name as unknown as keyof typeof colorByType
                      ],
                    marginLeft: index === 0 ? 0 : 25,
                  }}>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.06,
                      fontWeight: '500',
                    }}>
                    {item.type.name}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.containerType}>
              <FontAwesome
                onPress={changeFavoritePoke}
                name={isFavoritePoke ? 'heart' : 'heart-o'}
                size={45}
                color={'#f66'}
              />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              <Image
                source={{uri: singlePokemon.sprites.front_default}}
                style={{
                  ...styles.wrapperSprite,
                  height: windowHeight * 0.1,
                  width: windowWidth * 0.3,
                }}
              />
              <Image
                source={{uri: singlePokemon.sprites.front_default}}
                style={{
                  ...styles.wrapperSprite,
                  height: windowHeight * 0.1,
                  width: windowWidth * 0.3,
                }}
              />
              <Image
                source={{uri: singlePokemon.sprites.back_shiny}}
                style={{
                  ...styles.wrapperSprite,
                  height: windowHeight * 0.1,
                  width: windowWidth * 0.3,
                }}
              />
              <Image
                source={{uri: singlePokemon.sprites.front_shiny}}
                style={{
                  ...styles.wrapperSprite,
                  height: windowHeight * 0.1,
                  width: windowWidth * 0.3,
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  containerForFillScreen: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  decoratorHeader: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 15,
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  wrapperImg: {width: '100%', objectFit: 'contain'},
  containerType: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  wrapperTypes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
    minWidth: 110,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  wrapperSprite: {margin: 10, objectFit: 'contain'},
});
