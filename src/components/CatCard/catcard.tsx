import {CatDataI} from '@models/cats';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const CatCard: React.FC<CatDataI> = props => {
  const {url} = props;
  return (
    <View>
      <FastImage source={{uri: url}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    height: 90,
    resizeMode: FastImage.resizeMode.cover,
  },
});

export default React.memo(CatCard);
