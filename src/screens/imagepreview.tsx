import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Button, Header} from '@components';
import {ScreenProps, useAppNavigation} from '@models/navigation';
import {uploadCat} from '@services';
import useToast from '@store/toast/hooks';
import {isAndroid} from '@utils/index';

const ImagePreview: React.FC<ScreenProps<'ImagePreview'>> = props => {
  const {route} = props;
  const {imageData} = route?.params;

  const [loading, setLoading] = useState(false);
  const navigation = useAppNavigation();
  const {updateToast} = useToast();

  async function uploadImage() {
    setLoading(true);
    const response = await uploadCat(imageData);
    const {status} = response;

    setLoading(false);
    if (status === 201) {
      updateToast({message: 'Upload successful', type: 'success'});
    } else {
      updateToast({message: 'Failed to upload', type: 'error'});
    }
    navigation.navigate('TabNavigation');
  }
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Header title="Preview"  />
      </View>
      <View style={styles.container}>
        <View style={styles.previewImageContainer}>
          <FastImage source={{uri: imageData.uri}} style={styles.previewImage} />
        </View>
        <Button
          disabled={imageData?.uri!.length <= 0}
          inProgress={loading}
          label="Send"
          onPress={uploadImage}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: '8%',
    paddingTop: isAndroid ? '5%' : 0,
  },
  headerContainer: {
    paddingHorizontal: '8%',
  },
  previewImageContainer: {
    borderRadius: 12,
    height: '60%',
    marginVertical: '3%',
    paddingHorizontal: '3%',
  },
  previewImage: {
    borderRadius: 12,
    height: '90%',
    resizeMode: FastImage.resizeMode.cover,
  },
});

export default React.memo(ImagePreview);
