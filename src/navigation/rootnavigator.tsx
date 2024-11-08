import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {Colors} from '@constants/colors';
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
    <NavigationContainer theme={Theme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
