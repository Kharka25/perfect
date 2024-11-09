import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';

import {Button, Text} from '@components';
import {useAppNavigation} from '@models/navigation';
import {cameraPermission} from '@utils/index';

const Upload: React.FC = () => {
  const [_selectedImage, setSelectedImage] = useState<string | undefined>('');
  const {showActionSheetWithOptions} = useActionSheet();

  const navigation = useAppNavigation();

  function chooseImage() {
    const options = ['Take a Photo', 'Gallery', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {options, cancelButtonIndex, destructiveButtonIndex},
      async (selectedIndex: number | undefined) => {
        if (selectedIndex === 0) {
          takePhoto();
        }
        if (selectedIndex === 1) {
          await uploadImage();
        }
      },
    );
  }

  async function takePhoto() {
    let result: ImagePickerResponse = {};

    const granted = await cameraPermission();

    if (granted) {
      result = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      });
    }

    if (!result.didCancel) {
      setSelectedImage(result?.assets![0].uri);
    }
  }

  async function uploadImage() {
    const result = await launchImageLibrary({
      includeBase64: true,
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel) {
      setSelectedImage(result?.assets![0].uri);
      result.assets &&
        navigation.navigate('ImagePreview', {
          imageData: {
            name: result?.assets![0].fileName,
            type: result?.assets![0].type,
            uri: result?.assets![0].uri,
          },
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text text="Welcome to Purrfect Island 🏝️" style={styles.centerText} />
      <Button label={'Add your cat'} onPress={chooseImage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centerText: {
    marginBottom: 30,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '8%',
  },
});

export default Upload;
