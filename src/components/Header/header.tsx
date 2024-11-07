import React, {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ArrowLeft from 'react-native-vector-icons/FontAwesome5';

import {Text} from '@components';
import {useAppNavigation} from '@models/navigation';

interface Props {
  onRightIconPress?: () => void;
  rightIcon?: ReactNode;
  title?: string;
}

const Header: React.FC<Props> = props => {
  const {onRightIconPress, rightIcon, title} = props;
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconStyle}>
        <ArrowLeft name="arrow-left" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text text={title} style={styles.titleStyle} fontWeight="500" />
      </View>
      {rightIcon ? (
        <TouchableOpacity onPress={onRightIconPress} style={styles.iconStyle}>
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.iconStyle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconStyle: {
    minWidth: '15%',
  },
  titleContainer: {
    alignSelf: 'center',
  },
  titleStyle: {
    textAlign: 'center',
  },
});

export default React.memo(Header);
