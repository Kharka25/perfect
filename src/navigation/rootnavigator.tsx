import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';

import {Colors} from '@constants/colors';
import {Toast} from '@components';
import AppNavigator from './appnavigator';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.WHITE,
    primary: Colors.PRIMARY,
  },
};

const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer theme={Theme}>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default RootNavigator;
