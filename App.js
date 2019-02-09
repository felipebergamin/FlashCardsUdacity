import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import AddDeck from './components/AddDeck';
import reducers from './reducers';
import middlewares from './middlewares';
import DeckList from './components/DeckList';
import DeckView from './components/DeckView';

const StackNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: DeckList,
      navigationOptions: {
        header: null,
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        header: null,
      },
    },
    DeckView: {
      screen: DeckView,
      navigationOptions: {
        header: null,
      },
    },
  })
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers, middlewares)}>
        <View style={{ flex: 1 }}>
          <StackNavigator />
        </View>
      </Provider>
    );
  }
}
