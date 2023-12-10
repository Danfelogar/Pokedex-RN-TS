import React from 'react';
import {View, Text} from 'react-native';
import {RootStackMainParams} from '../navigation/navigationMain';
import {StackScreenProps} from '@react-navigation/stack';
import {StandarWrapper} from '../components/standarWrapper';

interface Props extends StackScreenProps<RootStackMainParams, 'Details'> {}

export const Details = ({route, navigation}: Props) => {
  const {pokeID} = route.params;
  return (
    <StandarWrapper>
      <Text style={{color: 'orange'}}>{pokeID}</Text>
    </StandarWrapper>
  );
};
