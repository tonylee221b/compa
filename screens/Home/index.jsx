import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

const Home = () => {
  return (
    <Layout style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/compa-logo-white.png')}
        />
        <CreateActivityForm />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    maxWidth: 150,
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    backgroundColor: 'tomato',
  },
});

export default Home;
