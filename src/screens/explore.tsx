import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import {CatCard, ProgressIndicator, Text} from '@components';
import {Colors} from '@constants/colors';
import {CatDataI} from '@models/cats';
import {getCatImages, toggleFavorite} from '@services';
import useToast from '@store/toast/hooks';
import {catchAsyncError} from '@config/api';
import {isAndroid} from '@utils/index';

const Explore: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [catsList, setCatsList] = useState<CatDataI[]>([]);
  const [favouriteCats, setFavouriteCats] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFavouriteId, setSelectedFavouriteId] = useState('');

  const {updateToast} = useToast();

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
    if (!favouriteCats.includes(imageId)) {
      const response = await toggleFavorite({data: {image_id: imageId}});
      const {id} = response.data;
      setSelectedFavouriteId(String(id));
      setFavouriteCats(prevState => [...prevState, imageId]);
      updateToast({message: 'Added to favourites', type: 'success'});
      return;
    }

    if (favouriteCats.includes(imageId)) {
      await toggleFavorite({favouriteId: selectedFavouriteId});
      setSelectedFavouriteId('');
      setFavouriteCats(prevState => prevState.filter(item => item !== imageId));
      updateToast({message: 'Removed from favourites', type: 'success'});
      return;
    }
  }

  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchCats();
    } catch (error) {
      catchAsyncError(error);
    }
    setRefreshing(false);
  }, [fetchCats]);

  const renderEmptyContent = () => {
    return (
      <View style={styles.container}>
        <Text text="Sorry, no feline to explore" fontSize={18} fontWeight="500" />
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
        onRefresh={handleRefresh}
        refreshing={refreshing}
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
    paddingTop: isAndroid ? '5%' : 0,
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

export default Explore;
