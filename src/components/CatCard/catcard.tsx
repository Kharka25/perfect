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

import {Text} from '@components';
import {Colors} from '@constants/colors';
import {voteCtaData} from '@constants/domi';
import {CatDataI} from '@models/cats';
import {CatRequestI, VoteType} from '@models/requests';
import {voteCat} from '@services';

interface Props {
  catData: CatDataI;
  style?: StyleProp<ViewStyle>;
  toggleFavorite: () => void;
}

const CatCard: React.FC<Props> = props => {
  const {catData, style, toggleFavorite} = props;
  const {id, url} = catData;

  const [catScore, setCatScore] = useState(0);
  const [isFavourite, setIsFavorite] = useState(false);

  function handleToggleFavourite() {
    toggleFavorite();
    setIsFavorite(!isFavourite);
  }

  async function handleVote(imageId: string, type: VoteType) {
    const voteData: CatRequestI = {
      image_id: imageId,
      value: type === VoteType.UP_VOTE ? 1 : -1,
    };

    await voteCat(voteData);
    if (type === VoteType.UP_VOTE) {
      setCatScore(prevState => prevState + 1);
    } else {
      setCatScore(prevState => (prevState <= 0 ? 0 : prevState - 1));
    }
  }

  return (
    <View style={[styles.container, style]}>
      <React.Fragment>
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
      </React.Fragment>
      <View style={styles.footerContainer}>
        <View style={styles.voteButtonContainer}>
          {voteCtaData.map((voteItem, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => handleVote(id, voteItem.type)}
                style={styles.voteButton}>
                <Text text={voteItem.label} />
              </TouchableOpacity>
            );
          })}
        </View>
        <Text
          text={catScore}
          color={Colors.PRIMARY}
          fontWeight="500"
          style={styles.voteScore}
        />
      </View>
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
  footerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '3%',
  },
  image: {
    aspectRatio: 1,
    borderRadius: 12,
    height: 180,
    resizeMode: FastImage.resizeMode.cover,
  },
  voteButton: {
    alignItems: 'center',
    backgroundColor: Colors.GREY_10,
    borderRadius: 5,
    justifyContent: 'center',
    padding: '5%',
  },
  voteButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  voteScore: {
    marginLeft: 15,
  },
});

export default React.memo(CatCard);
