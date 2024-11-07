import React from 'react';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import {RootNavigator} from '@navigation';

function App(): React.JSX.Element {
  return (
    <ActionSheetProvider>
      <RootNavigator />
    </ActionSheetProvider>
  );
}

export default App;
