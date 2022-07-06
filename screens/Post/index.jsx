import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Navbar from '../../components/Navbar';
import { getActivities } from '../../backend';
import { ActivityList } from '../../components/ActivityList';

const Post = ({ navigation }) => {
  const [activities, setActivities] = useState([]);

  useEffect(function fetchActivities() {
    getActivities('Toronto').then(setActivities);
  }, []);

  return (
    <Layout style={styles.container}>
      <Navbar navigation={navigation} index={1} />
      <ActivityList activities={activities} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    marginBottom: 30,
  },
});

export default Post;
