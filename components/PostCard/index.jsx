import { View, StyleSheet } from "react-native";
import { Card, Text } from "@ui-kitten/components";

const PostCard = ({ navigation, data }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
  },
});

export default PostCard;
