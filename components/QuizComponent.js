import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

class QuizComponent extends Component {
  state = {
    quizStatus: 'loading',
    correctAnswers: 0,
    incorrectAnswers: 0,
    deck: null,
    cards: null,
    usedCards: [],
    currentCard: null,
    showAnswer: false,
  }

  componentDidMount() {
    const { deck, cards } = this.props.navigation.state.params;

    const [firstCard, ...otherCards] = cards;

    this.setState({
      quizStatus: 'running',
      cards: otherCards,
      currentCard: firstCard,
      deck,
    });
  }

  nextCard = () => {
    const [newCard, ...cards] = this.state.cards;
    this.setState(({currentCard, usedCards}) => ({
      cards,
      currentCard: newCard,
      usedCards: [
        currentCard,
        ...usedCards,
      ],
    }));
    
    if (!newCard) this.endQuiz();
  }

  showAnswer = () => this.setState({ showAnswer: true });

  showQuestion = () => this.setState({ showAnswer: false });

  correctAnswer = () => {
    ToastAndroid.showWithGravity(
      'Yeah! Continue assim! 😆',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    this.setState(({ correctAnswers }) => ({ correctAnswers: ++correctAnswers, showAnswer: false }));
    this.nextCard();
  }

  incorrectAnswer = () => {
    ToastAndroid.showWithGravity(
      'Ops, acontece com os melhores! Bora pra próxima!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    this.setState(({ incorrectAnswers }) => ({ incorrectAnswers: ++incorrectAnswers, showAnswer: false }));
    this.nextCard();
  }

  endQuiz = () => {
    this.setState({ quizStatus: 'completed' });
  }

  leaveQuiz = () => {
    this.props.navigation.goBack();
  }

  restartQuiz = () => {
    this.setState(({usedCards}) => {
      const [firstCard, ...cards] = usedCards;

      return {
        cards,
        usedCards: [],
        quizStatus: 'running',
        correctAnswers: 0,
        incorrectAnswers: 0,
        currentCard: firstCard,
      };
    })
  }

  render() {
    const {
      currentCard,
      quizStatus,
      showAnswer,
      correctAnswers,
      incorrectAnswers,
    } = this.state;

    if (quizStatus === 'loading') {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }

    if (quizStatus === 'running') {
      return (
        <View style={styles.container}>
          <Text style={showAnswer ? styles.answer : styles.question}>
            {showAnswer
              ? currentCard.answer
              : currentCard.question}
          </Text>
  
          {showAnswer
            ? <TouchableOpacity onPress={this.showQuestion} style={[styles.button, styles.primaryButton]}>
                <Text style={[styles.buttonText, styles.primaryButtonText]}>Ver Pergunta</Text>
              </TouchableOpacity>
            : <TouchableOpacity onPress={this.showAnswer} style={[styles.button, styles.primaryButton]}>
                <Text style={[styles.buttonText, styles.primaryButtonText]}>Ver Resposta</Text>
              </TouchableOpacity>}
  
          <TouchableOpacity onPress={this.correctAnswer} style={[styles.button, styles.secondaryButton]}>
            <Text style={styles.buttonText}>Acertei! 😎</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={this.incorrectAnswer} style={[styles.button, styles.secondaryButton]}>
            <Text style={styles.buttonText}>Errei... 😅</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={this.leaveQuiz} style={[styles.button, styles.secondaryButton]}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
  
          <Text style={styles.infoText}>
            {this.state.cards.length === 0
              ? 'Esta é a última pergunta deste quiz! 😳'
              : `Restam ${this.state.cards.length} cartas neste quiz!`}
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.congratsText}>
          Parabéns, você concluiu o quiz! 🎉
        </Text>

        <Text style={styles.congratsText}>
          Você acertou {(correctAnswers / (correctAnswers + incorrectAnswers) * 100).toFixed(1)}% das perguntas!
        </Text>

        <TouchableOpacity onPress={this.restartQuiz} style={[styles.button, styles.secondaryButton]}>
          <Text style={[styles.buttonText]}>Recomeçar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.leaveQuiz} style={[styles.button, styles.secondaryButton]}>
          <Text style={[styles.buttonText]}>Sair</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    marginBottom: 20,
  },
  answer: {
    fontSize: 25,
    margin: 10,
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
  infoText: {
    marginTop: 30,
  },
  congratsText: {
    fontSize: 20,
    margin: 20,
    textAlign: 'center',
  },
})

export default QuizComponent;
