import React from 'react';
import {SafeAreaView} from 'react-native';

import {Text} from '@components';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <SafeAreaView>
      <Text text="Hello Purrfect" />
    </SafeAreaView>
  );
};

export default Home;
