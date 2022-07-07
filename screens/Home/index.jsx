import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {
  Layout,
  Text,
  Input,
  Button,
  Modal,
  Card,
} from '@ui-kitten/components';

const Home = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    if (city === '') {
      setVisible(true);
    } else {
      navigation.navigate('Posts', { city: city });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Layout style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/compa-logo-white.png')}
          />
        </View>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View
            onStartShouldSetResponder={() => true}
            style={styles.bodyContainer}
          >
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
                textStyle={{ color: 'black' }}
                style={styles.searchBar}
              />
              <Button style={styles.searchBtn} onPress={handleSubmit}>
                Search
              </Button>
              <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}
              >
                <Card disabled={true}>
                  <Text category="s1" style={styles.modalHeader}>
                    Type City / Town
                  </Text>
                  <Button onPress={() => setVisible(false)} status="danger">
                    DISMISS
                  </Button>
                </Card>
              </Modal>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
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
  searchBtn: {
    marginTop: 30,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    marginBottom: 10,
  },
});

export default Home;
