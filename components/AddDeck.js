import React, { Component } from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

class AddDeck extends Component {
  state = {
    title: null,
  }

  submit = () => alert(this.state.title);

  reset = () => {
    this.setState({ title: null });

    // route to deck list
  }

  render() {
    const { title } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.text}>
          Boa! Um novo baralho! 👊
        </Text>
        <Text style={styles.text}>
          E como vamos chama-lo? 🤔
        </Text>

        <TextInput
          autoFocus={true}
          style={styles.txtInput}
          placeholder='Nome do Baralho'
          onChangeText={title => this.setState({title})}
          value={title}/>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.cancelBtn} onPress={this.reset}>
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sbmtBtn} onPress={this.submit}>
            <Text style={[styles.btnText, styles.sbmtBtnTxt]}>Pronto!</Text>  
          </TouchableOpacity>
        </View>
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
  txtInput: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 60,
    fontSize: 18,
    width: '100%',
    borderRadius: 10,
    margin: 15,
    marginTop: 25,
    marginBottom: 25,
    padding: 10,
  },
  text: {
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  sbmtBtn: {
    borderRadius: 5,
    backgroundColor: 'blue',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  cancelBtn: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  sbmtBtnTxt: {
    color: 'white',
  },
  btnText: {
    fontSize: 22,
    textAlign: 'center',
  },
});

export default AddDeck;
