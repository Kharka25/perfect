import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Colors} from '@constants/colors';
import {AppStackParamList, GenerateNavigatorI} from '@models/navigation';

const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<AppStackParamList>();

const GenerateNavigator: React.FC<GenerateNavigatorI> = props => {
  const {initialRouteName, navType, paths} = props;

  if (navType === 'stack') {
    return (
      <Stack.Navigator initialRouteName={initialRouteName}>
        {paths.map((data, i) => (
          <Stack.Screen
            key={i}
            name={data.name}
            component={data.component}
            options={() => ({headerShown: false})}
          />
        ))}
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{tabBarStyle: {backgroundColor: Colors.WHITE}}}>
      {paths.map((data, i) => (
        <Tab.Screen
          key={i}
          component={data.component}
          name={data.name}
          options={() => ({...data?.options, headerShown: false})}
        />
      ))}
    </Tab.Navigator>
  );
};

export default GenerateNavigator;
