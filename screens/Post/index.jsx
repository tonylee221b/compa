import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import PropTypes from "prop-types";
import { getActivities } from "../../backend/activitiy-service";
import { ActivityList } from "../../components/ActivityList";

const Post = ({ navigation, route }) => {
  const city = route?.params?.city ?? "Toronto";
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getActivities(city)
        .then((data) => {
          setPostData(data);
        })
        .then(() => setIsLoading(false));
    }, [city])
  );

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

Post.propTypes = {
  route: PropTypes.any,
};

export default Post;
