import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {CatCard, ProgressIndicator, Text} from '@components';
import {Colors} from '@constants/colors';
import {CatDataI} from '@models/cats';
import {CatRequestI, VoteType} from '@models/requests';
import {getCatImages, toggleFavorite, voteCat} from '@services';

const voteCtaData = [
  {
    label: 'vote up',
    type: VoteType.UP_VOTE,
  },
  {
    label: 'vote down',
    type: VoteType.DOWN_VOTE,
  },
];

const Explore: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [catsList, setCatsList] = useState<CatDataI[]>([]);
  const [selectedFavouriteId, setSelectedFavouriteId] = useState('');

  const fetchCats = useCallback(async () => {
    let responseData: CatDataI[] = [];
    setLoading(true);
    const response = await getCatImages();
    const {data, status}: {data: CatDataI[]; status: number} = response;

    if (status === 200) {
      for (const cat of data) {
        // Normalise data
        const catObj: CatDataI = {
          height: cat.height,
          id: cat.id,
          url: cat.url,
          width: cat.width,
        };
        responseData.push(catObj);
      }
      setCatsList(responseData);
    }
    setLoading(false);
  }, []);

  async function handleFavorite(imageId: string) {
    let response;

    if (selectedFavouriteId.length > 0) {
      response = await toggleFavorite({favouriteId: selectedFavouriteId});
      setSelectedFavouriteId('');
      return;
    } else if (!selectedFavouriteId.length) {
      response = await toggleFavorite({data: {image_id: imageId}});
      const {data} = response;
      const {id} = data;
      setSelectedFavouriteId(String(id));
    }
  }

  async function handleVote(imageId: string, type: VoteType) {
    const voteData: CatRequestI = {
      image_id: imageId,
      value: type === VoteType.UP_VOTE ? 1 : -1,
    };

    const response = await voteCat(voteData);
    console.log(response, 'HERE');
  }

  const renderEmptyContent = () => {
    return (
      <View>
        <Text text="Sorry, no feline to explore" />
      </View>
    );
  };

  const renderItem: ListRenderItem<CatDataI> = ({item, index}) => {
    return (
      <View style={styles.catCardContainer}>
        <CatCard
          key={index}
          catData={{height: item.height, id: item.id, url: item.url}}
          style={[styles.catCard, index % 2 === 0 ? styles.mrSm : null]}
          toggleFavorite={() => handleFavorite(item.id)}
        />
        <View style={styles.voteButtonContainer}>
          {voteCtaData.map((voteItem, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => handleVote(item.id, voteItem.type)}
                style={styles.voteButton}>
                <Text text={voteItem.label} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ProgressIndicator color={Colors.PRIMARY} size={30} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={catsList}
        ListEmptyComponent={renderEmptyContent}
        numColumns={2}
        renderItem={renderItem}
        style={styles.flatlist}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  catCard: {
    marginBottom: 5,
  },
  catCardContainer: {
    marginBottom: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '6%',
    paddingTop: '3%',
  },
  flatlist: {
    gap: '2%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mrSm: {
    marginRight: '3%',
  },
  voteButton: {
    alignItems: 'center',
    backgroundColor: Colors.GREY_10,
    borderRadius: 5,
    justifyContent: 'center',
    padding: '5%',
  },
  voteButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
});

export default React.memo(Explore);
