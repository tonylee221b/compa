import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { getActivities } from '../../backend/activitiy-service';
import { ActivityList } from '../../components/ActivityList';

const Post = ({ navigation }) => {
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getActivities('Toronto')
      .then((data) => setPostData(data))
      .then(() => setIsLoading(false));
  }, []);

  return (
    !isLoading && (
      <Layout style={styles.container}>
        <ActivityList activities={postData} />
      </Layout>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  card: {
    marginVertical: 10,
  },
});

export default Post;
