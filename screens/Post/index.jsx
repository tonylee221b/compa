import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import PostCard from '../../components/PostCard';
import { getActivities } from '../../backend/activitiy-service';

const Post = ({ navigation }) => {
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getActivities()
      .then((data) => setPostData(data))
      .then(() => setIsLoading(false));
  }, []);

  return (
    !isLoading && (
      <Layout style={styles.container}>
        {postData.length > 0 &&
          postData.map((data, _) => (
            <PostCard navigation={navigation} data={data} key={data.id} />
          ))}
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
