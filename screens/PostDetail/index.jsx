import React, { useEffect, useState } from 'react';
import { DbActivity, DbUser, getUser } from '../../backend';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
//import {MapView} from "react-native-maps";
import {
  Layout,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

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

const PostDetail = ({ navigation, route }) => {
  const { activity } = route.params;

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(activity.userId).then((user) => setUser(user));
  }, [activity.userId]);

  const OnPressJoin = function () {
    alert('You have now joined the activity');
  };

  if (!user) return <Text>Loading...</Text>;

  return (
    <Layout style={styles.container}>
      <BackNavigation navigation={navigation} />
      <Layout style={styles.titleContainer}>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.numberOfPeople}>
          {' '}
          {activity.participants.length}/{activity.limit} Participants
        </Text>
      </Layout>

      <Text style={styles.author}>Author: {user.name}</Text>

      <Text style={styles.date}>Date: {activity.startDate}</Text>

      <Text>Description of activity:</Text>

      <Text style={styles.description}>{activity.description}</Text>

      <Text style={styles.address}>
        where: <Text>{activity.city}</Text>
      </Text>

      <Text style={styles.contact}>
        Contact: <Text> facebook </Text>{' '}
      </Text>

      <Pressable style={styles.joinBotton} onPress={OnPressJoin}>
        <Text style={styles.bottonText}>Join</Text>
      </Pressable>

      <Text style={styles.description}>People who joined: </Text>
      <Layout>
        {activity.participants.map((v, i) => (
          <Text key={i.toString()}>{v.name}</Text>
        ))}
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: '#e5e5e5',
    fontSize: 25,
  },
  author: {
    fontSize: 16,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  date: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  description: {
    fontSize: 14,
    paddingTop: 5,
  },
  address: {
    paddingTop: 16,
    fontSize: 20,
  },
  contact: {
    fontSize: 20,
  },
  link: {
    fontSize: 20,
    paddingBottom: 10,
  },
  joinBotton: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#07E025',
  },
  bottonText: {
    fontSize: 16,
    color: 'white',
  },
  header: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: 10,
  },
  numberOfPeople: {
    paddingLeft: 10,
    paddingTop: 10,
    alignItems: 'flex-start',
  },
  // mapView:{
  //   alignSelf: "stretch",
  //   height: "100%",
  // }
});

export default PostDetail;

//id: string;
//userId: string;
//title: string;
//description: string;
//limit: number;
//participants: Participant[];
//startDate: string;
//createdAt: string;
//updatedAt: string;
//googleMapUrl: string;
//city: string;
