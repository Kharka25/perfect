import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
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
import {getCatImages} from '@services';

const Explore: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [catsList, setCatsList] = useState<CatDataI[]>([]);

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

  const renderEmptyContent = () => {
    return (
      <View>
        <Text text="Sorry, no feline to explore" />
      </View>
    );
  };

  const renderItem: ListRenderItem<CatDataI> = ({item, index}) => {
    return (
      <CatCard key={index} height={item.height} id={item.id} url={item.url} />
    );
  };

  useFocusEffect(() => {
    fetchCats();
  });

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ProgressIndicator color={Colors.PRIMARY} size={30} />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <Text text="Explore" />
      <FlatList
        data={catsList}
        ListEmptyComponent={renderEmptyContent}
        renderItem={renderItem}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Explore;
