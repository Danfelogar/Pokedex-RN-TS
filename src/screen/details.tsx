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
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';

import {RootStackMainParams} from '../navigation/navigationMain';
import {LoadingScreen} from '../components/loadingScreen';
import {RootState} from '../redux/store';
import {getOficialImg, windowHeight, windowWidth} from '../util/magicalString';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colorByType} from '../util/typeColor';

interface Props extends StackScreenProps<RootStackMainParams, 'Details'> {}

export const Details = ({route, navigation}: Props) => {
  const {isLoading, singlePokemon} = useSelector(
    (state: RootState) => state.singlePokeReducer,
  );
  const isDarkMode = useColorScheme() === 'dark';
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
                <Text style={styles.textTitle}>{'<'}</Text>
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
                  style={{
                    ...styles.wrapperTypes,
                    backgroundColor:
                      colorByType[
                        item.type.name as unknown as keyof typeof colorByType
                      ],
                    marginLeft: index === 0 ? 0 : 25,
                  }}>
                  <Text
                    key={index}
                    style={{
                      fontSize: windowWidth * 0.06,
                      fontWeight: '500',
                    }}>
                    {item.type.name}
                  </Text>
                </View>
              ))}
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
