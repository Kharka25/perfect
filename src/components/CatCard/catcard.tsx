import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import FavouriteIcon from 'react-native-vector-icons/Octicons';

import {CatDataI} from '@models/cats';
import {Colors} from '@constants/colors';

interface Props {
  catData: CatDataI;
  style?: StyleProp<ViewStyle>;
  toggleFavorite: () => void;
}

const CatCard: React.FC<Props> = props => {
  const {catData, style, toggleFavorite} = props;
  const {url} = catData;

  const [isFavourite, setIsFavorite] = useState(false);

  function handleToggleFavourite() {
    toggleFavorite();
    setIsFavorite(!isFavourite);
  }

  return (
    <View style={[styles.container, style]}>
      <FastImage source={{uri: url}} style={styles.image} />
      <TouchableOpacity
        onPress={handleToggleFavourite}
        style={styles.favouriteIcon}>
        <FavouriteIcon
          name={isFavourite ? 'heart-fill' : 'heart'}
          color={isFavourite ? Colors.FAVOURITE_PINK : Colors.WHITE}
          size={18}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  favouriteIcon: {
    position: 'absolute',
    right: 6,
    top: 10,
  },
  image: {
    aspectRatio: 1,
    borderRadius: 12,
    height: 180,
    resizeMode: FastImage.resizeMode.cover,
  },
});

export default React.memo(CatCard);
