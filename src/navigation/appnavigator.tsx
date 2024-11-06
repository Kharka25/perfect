import React from 'react';

import GenerateNavigator from '@config/generatenavigator';
import {ScreenType} from '@models/navigation';
import {Explore, Home} from '@screens';

const tabs: ScreenType[] = [
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'Explore',
    component: Explore,
  },
];

const AppNavigator: React.FC = () => {
  return (
    <GenerateNavigator initialRouteName="Home" navType="tab" paths={tabs} />
  );
};

export default AppNavigator;
