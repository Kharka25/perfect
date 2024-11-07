import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Button, Header} from '@components';
import {ScreenProps} from '@models/navigation';
import {uploadCat} from '@services';

const ImagePreview: React.FC<ScreenProps<'ImagePreview'>> = props => {
  const {route} = props;
  const {imageFile} = route?.params;

  async function uploadImage() {
    await uploadCat(imageFile);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Preview" />
      <View style={styles.previewImageContainer}>
        <FastImage source={{uri: imageFile}} style={styles.previewImage} />
      </View>
      <Button
        disabled={imageFile.length <= 0} // Disable if no image
        label="Send"
        onPress={uploadImage}
      />
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
