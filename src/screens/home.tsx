import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import {Colors} from '@constants/colors';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <SafeAreaView>
      <Text style={{color: Colors.BLACK}}>Hello Purrfect!!</Text>
    </SafeAreaView>
  );
};

export default Home;
