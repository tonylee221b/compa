import React from "react";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StyleSheet } from "react-native";
import {
  Layout,
  ApplicationProvider,
  IconRegistry,
} from "@ui-kitten/components";
import NavContainer from "./components/Navigation";

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <Layout style={styles.container}>
          <NavContainer />
        </Layout>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
