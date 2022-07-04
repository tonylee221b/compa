import React, { useState, useEffect } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Text, Layout } from "@ui-kitten/components";

import Navbar from "./components/Navbar";

const HomeScreen = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text category="h1">Home</Text>
    </Layout>
  );
};

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <HomeScreen />
    </ApplicationProvider>
  );
};

export default App;
