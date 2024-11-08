import React from 'react';

import GenerateNavigator from '@config/generatenavigator';
import {ScreenType} from '@models/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Explore, Home, ImagePreview} from '@screens';

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

const TabNavigation: React.FC = () => {
  return (
    <GenerateNavigator initialRouteName="Home" navType="tab" paths={tabs} />
  );
};

const stacks: ScreenType[] = [
  {
    name: 'ImagePreview',
    component: ImagePreview,
  },
  {
    name: 'TabNavigation',
    component: TabNavigation,
  },
];

const AppNavigator: React.FC = () => {
  return (
    <GenerateNavigator
      initialRouteName="TabNavigation"
      navType="stack"
      paths={stacks}
    />
  );
};

export default AppNavigator;
