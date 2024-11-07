import {CatDataI} from '@models/cats';
import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

const CatCard: React.FC<CatDataI> = props => {
  const {url} = props;
  return (
    <View>
      <FastImage source={{uri: url}} />
    </View>
  );
};

export default React.memo(CatCard);
