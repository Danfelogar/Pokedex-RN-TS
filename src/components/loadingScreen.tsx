import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    flex: 1,
  },
});
