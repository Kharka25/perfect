import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AppBottomTabParamList = {
  Explore: undefined;
  Home: undefined;
};

export interface ImageData {
  name?: string;
  type?: string;
  uri?: string;
}

export type AppStackParamList = {
  ImagePreview: {imageData: ImageData};
  TabNavigation: undefined;
} & AppBottomTabParamList;

export type ScreenType = {
  component: React.FC<any>;
  name: keyof AppStackParamList;
  options?: BottomTabNavigationOptions;
};

export type ScreenProps<
  T extends 'ImagePreview' | 'TabNavigation' | keyof AppBottomTabParamList,
> = NativeStackScreenProps<AppStackParamList, T>;

export interface GenerateNavigatorI {
  initialRouteName: keyof AppStackParamList;
  paths: ScreenType[];
  navType: 'stack' | 'tab';
}

export function useAppNavigation() {
  return useNavigation<NavigationProp<AppStackParamList>>();
}
