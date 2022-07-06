import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Layout, Text, Input } from '@ui-kitten/components';

const Home = () => {
  const [city, setCity] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Layout style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/compa-logo-white.png')}
          />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.headingContainer}>
            <Text category="s1" style={{ fontSize: 32 }}>
              Find Your Compa!
            </Text>
          </View>
          <View style={styles.searchContainer}>
            <Text category="s1" style={{ fontSize: 20 }}>
              Enter City / Town
            </Text>
            <Input
              placeholder="Type City / Town"
              value={city}
              onChangeText={(cityName) => setCity(cityName)}
              onBlur={() => Keyboard.dismiss()}
              style={styles.searchBar}
            />
          </View>
        </View>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    maxWidth: 150,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  bodyContainer: {
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    marginBottom: 50,
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    marginTop: 30,
    width: '100%',
    backgroundColor: 'white',
  },
});

export default Home;
