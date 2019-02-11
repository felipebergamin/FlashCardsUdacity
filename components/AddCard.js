import React, { Component } from 'react';
import { handleAddCard } from '../actions';
import { connect } from 'react-redux';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class AddCard extends Component {
  state = {
    question: null,
    answer: null,
  }

  onSubmit = () => {
    const card = {
      id: Date.now(),
      question: this.state.question,
      answer: this.state.answer,
      deckId: this.props.navigation.state.params.deck.id,
    };

    this.props.addCard(card);
    this.props.goBack();
  }

  render() {
    const { deck } = this.props.navigation.state.params;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.text}>
          Você está adicionando um cartão ao baralho {deck.title}.
        </Text>
        <Text style={styles.text}>
          Vai lá, capricha! 😉
        </Text>

        <View style={{ height: 20 }} />

        <TextInput
          autoFocus={true}
          style={styles.textInput}
          onChangeText={question => this.setState({question})}
          placeholder='Escreva a pergunta' />

        <TextInput
          style={styles.textInput}
          onChangeText={answer => this.setState({answer})}
          multiline={true}
          placeholder='Qual a resposta correta?' />

        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={this.onSubmit}>
          <Text style={[styles.buttonText, styles.primaryButtonText]}>Salvar Cartão</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={this.props.goBack}>
          <Text style={[styles.buttonText]}>Cancelar</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    margin: 5,
    textAlign: 'center',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 60,
    fontSize: 18,
    width: '100%',
    borderRadius: 10,
    margin: 15,
    padding: 10,
  },
  button: {
    borderRadius: 5,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: 'black',
  },
  secondaryButton: {
    borderColor: 'black',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 22,
    textAlign: 'center',
  },
  primaryButtonText: {
    color: 'white',
  },
})

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    addCard: card => dispatch(handleAddCard(card)),
    goBack: () => navigation.goBack(),
  };
}

export default connect(null, mapDispatchToProps)(AddCard);
