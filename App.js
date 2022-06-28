import react, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

class MyComponent extends Component {
  state = {
    title: 'Welcome to WEB530',
    btnTitle: 'GO',
  };

  render() {
    const { title, btnTitle } = this.state;

    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        <Button title={btnTitle} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return <MyComponent />;
}
