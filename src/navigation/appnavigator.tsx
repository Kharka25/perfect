import React from 'react';

import GenerateNavigator from '@config/generatenavigator';
import {ScreenType} from '@models/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Explore, Upload, ImagePreview} from '@screens';

const tabs: ScreenType[] = [
  {
    name: 'Explore',
    component: Explore,
    options: {
      tabBarIcon: props => {
        return <Icon name="explore" color={props.color} size={20} />;
      },
    },
  },
  {
    name: 'Upload',
    component: Upload,
    options: {
      tabBarIcon: props => {
        return <Icon name="upload" color={props.color} size={20} />;
      },
    },
  },
];

const TabNavigation: React.FC = () => {
  return (
    <GenerateNavigator initialRouteName="Explore" navType="tab" paths={tabs} />
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
