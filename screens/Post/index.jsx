import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Layout, Text, Card } from "@ui-kitten/components";
import Navbar from "../../components/Navbar";

const postData = [
  {
    id: 1,
    userId: "tony",
    title: "Wanna grab a beer?",
    content: "Who wants to grab a beer in downtown Toronto?",
  },
  {
    id: 2,
    userId: "thomas",
    title: "Wanna go hiking?",
    content: "Let's go to an adventure!",
  },
];

const Post = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <Navbar navigation={navigation} index={1} />
      {postData.length > 0 &&
        postData.map((data, _) => (
          <Card
            key={data.id}
            style={styles.card}
            onPress={() => navigation.navigate("PostDetail")}
          >
            <View>
              <Text category="h5">{data.title}</Text>
              <Text category="s1">{data.content}</Text>
            </View>
          </Card>
        ))}
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
