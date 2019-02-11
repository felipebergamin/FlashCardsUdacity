import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { loadInitialData } from '../actions';

class DeckList extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  goToDeckView = deckId => {
    this.props.navigation.navigate('DeckView', { deckId });
  }

  newDeck = () => {
    this.props.navigation.navigate('AddDeck');
  }

  renderItem = ({ item: itemId }) => {
    const { decks, cards } = this.props;

    return (
      <TouchableOpacity style={styles.deckItem} onPress={() => this.goToDeckView(itemId)}>
        <Text style={[styles.centerText, styles.deckTitle]}>{decks[itemId].title}</Text>
        <Text style={[styles.centerText]}>{Object.keys(cards).filter(key => cards[key].deckId == itemId).length} cards</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
          data={Object.keys(this.props.decks)}
          keyExtractor={(item) => item}
          renderItem={this.renderItem} />

        <TouchableOpacity style={styles.newDeckButton} onPress={this.newDeck}>
          <Text style={styles.newDeckButtonText}>Novo Baralho</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckTitle: {
    fontSize: 20,
  },
  deckItem: {
    height: 100,
    justifyContent: 'center',
  },
  newDeckButton: {
    padding: 20,
    paddingBottom: 40,
  },
  newDeckButtonText: {
    fontSize: 20,
  },
});

function mapStateToProps({ decks, cards }) {
  return {
    decks: decks,
    cards: cards,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: () => dispatch(loadInitialData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);