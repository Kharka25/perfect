import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Button, Header} from '@components';
import {ScreenProps} from '@models/navigation';

const ImagePreview: React.FC<ScreenProps<'ImagePreview'>> = props => {
  const {route} = props;
  const {imageFile} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Preview" />
      <View style={styles.previewImageContainer}>
        <FastImage source={{uri: imageFile}} style={styles.previewImage} />
      </View>
      <Button label="Send" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '8%',
  },
  previewImageContainer: {
    borderRadius: 12,
    height: '60%',
    paddingHorizontal: '3%',
  },
  previewImage: {
    borderRadius: 12,
    height: '90%',
    resizeMode: FastImage.resizeMode.cover,
  },
});

export default React.memo(ImagePreview);
