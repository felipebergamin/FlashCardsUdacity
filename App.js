import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import AddDeck from './components/AddDeck';
import reducers from './reducers';
import middlewares from './middlewares';
import DeckList from './components/DeckList';
import DeckView from './components/DeckView';
import AddCard from './components/AddCard';
import QuizComponent from './components/QuizComponent';
import { setLocalNotification } from './utils/helpers';

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
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        header: null,
      },
    },
    Quiz: {
      screen: QuizComponent,
      navigationOptions: {
        header: null,
      },
    },
  })
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducers, middlewares)}>
        <View style={{ flex: 1 }}>
          <View>
            <StatusBar barStyle='default' hidden={true} />
          </View>

          <StackNavigator />
        </View>
      </Provider>
    );
  }
}
