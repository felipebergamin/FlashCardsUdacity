import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AddDeck from './components/AddDeck';
import reducers from './reducers';
import middlewares from './middlewares';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers, middlewares)}>
        <View style={{ flex: 1 }}>
          <AddDeck />
        </View>
      </Provider>
    );
  }
}
