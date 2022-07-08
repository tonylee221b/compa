import React, { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StyleSheet } from 'react-native';
import {
  Layout,
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import NavContainer from './components/Navigation';
import { init } from './init';
import { AuthUserProvider } from './context/AuthUserContext';

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    init().then(() => setReady(true));
  }, []);

  return (
    ready && (
      <AuthUserProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
          <Layout style={styles.container}>
            <NavContainer />
          </Layout>
        </ApplicationProvider>
      </AuthUserProvider>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default App;
