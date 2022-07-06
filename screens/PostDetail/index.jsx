import React from "react";
import { StyleSheet } from "react-native";
import {
  Layout,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const BackAction = ({ navigation }) => (
  <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
);
const BackNavigation = ({ navigation }) => (
  <TopNavigation
    accessoryLeft={<BackAction navigation={navigation} />}
    title="Post Detail"
  />
);

const PostDetail = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <BackNavigation navigation={navigation} />
      <Text>Post Detail Screen</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: "#e5e5e5",
    flex: 1,
  },
  header: {
    flex: 1,
  },
});

export default PostDetail;
