import React, { Component } from 'react';
import t from 'tcomb-form-native';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const Form = t.form.Form;
const User = t.struct({
  cpf: t.String,
  password: t.String,
  save: t.Boolean
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          BR-SOS
        </Text>

        <Form type={User} style={{ marginTop: 50 }}/>

        <Button
          title="Sign Up!"
          //onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 40,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  }
});