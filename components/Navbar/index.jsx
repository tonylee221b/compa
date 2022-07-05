import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Tab, TabView } from "@ui-kitten/components";

export const Navbar = ({ navigation, index }) => {
  const shouldLoadComp = (ind) => ind === index;

  return (
    <TabView
      selectedIndex={index}
      shouldLoadComponent={shouldLoadComp}
      onSelect={(ind) => navigation.navigate(ind === 0 ? "Home" : "Post")}
    >
      <Tab title="HOME">
        <Layout style={styles.tabContainer}></Layout>
      </Tab>
      <Tab title="POSTS">
        <Layout style={styles.tabContainer}></Layout>
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Navbar;
