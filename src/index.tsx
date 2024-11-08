import React from 'react';
import {Provider} from 'react-redux';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import {RootNavigator} from '@navigation';
import {store} from '@store/store';

function App(): React.JSX.Element {
  return (
    <ActionSheetProvider>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </ActionSheetProvider>
  );
}

export default App;
