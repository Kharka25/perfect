import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LoadingIcon from 'react-native-vector-icons/AntDesign';

import {Colors} from '@constants/colors';
import {StyleSheet} from 'react-native';

interface Props {
  color?: string;
  size?: number;
}

const ProgressIndicator: React.FC<Props> = props => {
  const {color = Colors.WHITE, size = 16} = props;

  const rotateValue = useSharedValue(0);

  const transformValue = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotateValue.value}deg`}],
    };
  });

  useEffect(() => {
    rotateValue.value = withRepeat(withTiming(360), -1);
  });

  return (
    <Animated.View style={[styles.container, transformValue]}>
      <LoadingIcon name="loading1" color={color} size={size} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(ProgressIndicator);
