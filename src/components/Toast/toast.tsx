import React, {useEffect} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ToastIcon from 'react-native-vector-icons/FontAwesome5';

import useToast from '@store/toast/hooks';
import {Colors} from '@constants/colors';
import {Text} from '@components';
import {isAndroid} from '@utils/index';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const Toast: React.FC<Props> = ({style}) => {
  const {toastState, updateToast} = useToast();

  const {message, type} = toastState;

  const toastIcon = type === 'success' ? 'check-circle' : 'exclamation-circle';
  const toastIconColor = type === 'success' ? Colors.PRIMARY : Colors.RED;

  const opacity = useSharedValue(0);
  const top = useSharedValue(0);

  const toastAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      top: top.value,
    };
  });

  useEffect(() => {
    let timeoutId = 0;
    function displayToast() {
      opacity.value = withTiming(1, {
        duration: 150,
      });
      top.value = withTiming(isAndroid ? 30 : 50, {
        duration: 150,
      });

      //@ts-ignore
      timeoutId = setTimeout(() => {
        opacity.value = withTiming(0, {
          duration: 150,
        });
        top.value = withTiming(0, {
          duration: 150,
        });
        updateToast({message: '', type});
      }, 3000);
    }

    // eslint-disable-next-line curly
    if (message) displayToast();

    return () => clearTimeout(timeoutId);
  }, [message, opacity, top, type, updateToast]);

  return (
    <Animated.View style={[styles.container, style, toastAnimatedStyle]}>
      <ToastIcon
        name={toastIcon}
        color={toastIconColor}
        style={styles.toastIcon}
      />
      <Text text={message} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    elevation: 3,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 10,
    position: 'absolute',
    shadowRadius: 10,
    shadowColor: Colors.DARK_GREY,
    shadowOpacity: 0.23,
    shadowOffset: {width: -2, height: 4},
    width: '92%',
  },
  toastIcon: {
    marginRight: '3%',
  },
});

export default React.memo(Toast);
