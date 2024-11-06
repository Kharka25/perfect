import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

export type AppBottomTabParamList = {
  Explore: undefined;
  Home: undefined;
};

export type ScreenType = {
  component: React.FC;
  name: keyof AppBottomTabParamList;
  options?: BottomTabNavigationOptions;
};

export interface GenerateNavigatorI {
  initialRouteName: keyof AppBottomTabParamList;
  paths: ScreenType[];
  navType: 'stack' | 'tab';
}
