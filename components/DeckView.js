import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

function DeckView(props) {
  const { deck, cards } = props;
  const hasCards = cards && cards.length > 0;

  goToAddCard = deck => props.navigation.navigate('AddCard', { deck });

  startQuiz = () => {
    props.navigation.navigate('Quiz', { deck, cards });
  }

  if (!props.deck) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.deckTitle}>
        {deck.title}
      </Text>

      <Text style={styles.cardsText}>
        {cards.length} cartas
      </Text>

      <TouchableOpacity style={styles.button} disabled={!hasCards} onPress={this.startQuiz}>
        <Text style={[styles.buttonText, (hasCards ? {} : styles.disabledButtonText)]}>
          Iniciar Quiz
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => goToAddCard(deck)}>
        <Text style={styles.buttonText}>
          Nova Carta
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={props.goBack}>
        <Text style={styles.buttonText}>
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckTitle: {
    fontSize: 25,
    paddingBottom: 20,
  },
  cardsText: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, .5)',
    marginBottom: 30,
  },
  button: {
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  disabledButtonText: {
    color: 'rgba(0, 0, 0, .2)',
  },
});

function mapStateToProps({ decks, cards }, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: decks[deckId],
    cards: Object.keys(cards).map(key => cards[key]).filter(card => card.deckId == deckId),
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView);
