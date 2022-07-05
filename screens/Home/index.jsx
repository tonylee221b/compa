import React from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import Navbar from "../../components/Navbar";

const Home = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <Navbar navigation={navigation} index={0} />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/compa-logo-white.png")}
        />
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
    flex: 1,
  },
  logo: {
    width: 150,
    resizeMode: "contain",
  },
});

export default Home;
