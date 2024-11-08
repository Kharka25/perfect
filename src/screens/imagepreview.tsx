import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Button, Header} from '@components';
import {ScreenProps, useAppNavigation} from '@models/navigation';
import {uploadCat} from '@services';

const ImagePreview: React.FC<ScreenProps<'ImagePreview'>> = props => {
  const {route} = props;
  const {imageData} = route?.params;

  const [loading, setLoading] = useState(false);
  const navigation = useAppNavigation();

  async function uploadImage() {
    setLoading(true);
    const response = await uploadCat(imageData);
    const {status} = response;

    if (status === 200) {
    } //TODO show toast notification
    setLoading(false);
    navigation.navigate('TabNavigation');
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Preview" />
      <View style={styles.previewImageContainer}>
        <FastImage source={{uri: imageData.uri}} style={styles.previewImage} />
      </View>
      <Button
        disabled={imageData?.uri!.length <= 0}
        inProgress={loading}
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
