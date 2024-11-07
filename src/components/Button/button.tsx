import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import {Text} from '@components';
import {Colors} from '@constants/colors';

interface Props {
  disabled?: boolean;
  inProgress?: boolean;
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<Props> = props => {
  const {disabled, label, onPress, style} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, disabled && styles.disabled, style]}>
      <Text color={!disabled ? Colors.WHITE : Colors.DARK_GREY} text={label} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 12,
    paddingVertical: 20,
  },
  disabled: {
    backgroundColor: Colors.GREY_10,
  },
});

export default React.memo(Button);
