import React, {ReactNode} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

export const StandarWrapper = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    //marginTop: StatusBar.currentHeight || 0,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
        showHideTransition="slide"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      {children}
    </SafeAreaView>
  );
};
