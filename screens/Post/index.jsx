import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import { getActivities } from '../../backend/activitiy-service';
import { ActivityList } from '../../components/ActivityList';
import { useAuthUserContext } from '../../context/AuthUserContext';

const Post = ({ navigation, route }) => {
  const { authUser } = useAuthUserContext();
  const city = route?.params?.city;
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      if (!city || city.length === 0) {
        setPostData([]);
        navigation.navigate('Home');
        return;
      }
      if (city && authUser.id) {
        getActivities(city, authUser.id)
          .then((data) => {
            setPostData(data);
          })
          .then(() => setIsLoading(false));
      }
    }, [city, authUser?.id])
  );

  const onJoinPress = (id) => {
    setPostData((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    !isLoading && (
      <Layout style={styles.container}>
        <Text category="h1">Results for {city}</Text>
        <Layout style={{ marginTop: 16 }}>
          <ActivityList onJoin={onJoinPress} activities={postData} />
        </Layout>
      </Layout>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 20,
  },
  card: {
    marginVertical: 10,
  },
});

Post.propTypes = {
  route: PropTypes.any,
};

export default Post;
