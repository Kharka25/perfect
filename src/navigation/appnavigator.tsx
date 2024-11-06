import React from 'react';

import GenerateNavigator from '@config/generatenavigator';
import {ScreenType} from '@models/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Explore, Home} from '@screens';

const tabs: ScreenType[] = [
  {
    name: 'Home',
    component: Home,
    options: {
      tabBarIcon: props => {
        return <Icon name="home" color={props.color} size={20} />;
      },
    },
  },
  {
    name: 'Explore',
    component: Explore,
    options: {
      tabBarIcon: props => {
        return <Icon name="explore" color={props.color} size={20} />;
      },
    },
  },
];

const AppNavigator: React.FC = () => {
  return (
    <GenerateNavigator initialRouteName="Home" navType="tab" paths={tabs} />
  );
};

export default AppNavigator;
