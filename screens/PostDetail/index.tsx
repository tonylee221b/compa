import React, { useEffect, useState } from 'react';
import {
  addParticipant,
  DbActivity,
  DbUser,
  getUser,
  isInActivity,
  leaveActivity,
} from '../../backend';
import { Alert, Image, StyleSheet } from 'react-native';
//import {MapView} from "react-native-maps";
import {
  Layout,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  Divider,
  Button,
} from '@ui-kitten/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Details } from '../../components/Details';
import dayjs from 'dayjs';
import { getPlaceDetail, Place } from '../../backend/location-service';
import MapView from 'react-native-maps';
import { ParticipantList } from '../../components/ParticipantList';
import open from 'react-native-open-maps';
import { useAuthUserContext } from '../../context/AuthUserContext';
import { BackAction } from '../../components/BackButton';

export interface PostDetailProps extends NativeStackScreenProps<any, any> {}

const PostDetail = ({ navigation, route }: PostDetailProps) => {
  const activity = route.params!.activity as DbActivity;
  const { authUser } = useAuthUserContext();
  const [place, setPlace] = useState<Place | undefined>();
  const [user, setUser] = useState<DbUser | undefined>();
  const [inActivity, setInActivity] = useState(false);

  useEffect(
    function checkParticipation() {
      if (authUser?.id) {
        isInActivity(activity.id, authUser.id)
          .then(setInActivity)
          .catch((err) => Alert.alert('Error', err.message));
      }
    },
    [activity.id, authUser?.id]
  );

  useEffect(() => {
    getUser(activity.userId)
      .then(setUser)
      .catch((err) => Alert.alert('Error', err.message));
  }, [activity.userId]);

  useEffect(() => {
    if (activity.placeId) {
      getPlaceDetail(activity.placeId)
        .then(setPlace)
        .catch((err) => Alert.alert('Error', err.message));
    }
  }, [activity.placeId]);

  const onPressJoin = async () => {
    if (!authUser) {
      Alert.alert('Error', 'You must be logged in to perform this operation');
      return;
    }

    try {
      inActivity
        ? await leaveActivity(activity.id, authUser.id)
        : await addParticipant(activity.id, authUser);
      navigation.navigate('MyActivities');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  if (!user) return <Text>Loading...</Text>;

  return (
    <Layout style={styles.container}>
      <BackAction />
      <Text category="h1">{activity.title}</Text>
      <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text category="s1">with {user.name}</Text>
        <Text category="s1">
          {activity.participants.length}/{activity.limit} participants
        </Text>
      </Layout>

      <Layout style={{ marginTop: 32 }}>
        <Text>{activity.description}</Text>
        <Details
          label="Date"
          value={dayjs(activity.startDate).format('MMM DD, YYYY hh:mm A')}
        />
        <Details label="City" value={activity.city} />
        <Details
          label="Location"
          value={place?.formatted_address ?? '(Unspecified)'}
        />
        {place && (
          <Image
            style={{
              marginTop: 16,
              height: 100,
            }}
            source={{ uri: place.staticMapLink }}
          />
        )}
        <Layout style={{ marginTop: 16 }}>
          <ParticipantList participants={activity.participants} />
        </Layout>

        <Layout
          style={{
            marginTop: 16,
          }}
        >
          {place && (
            <Button
              status="basic"
              onPress={() =>
                open({
                  provider: 'google',
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                })
              }
            >
              Open in Maps
            </Button>
          )}
          {activity.userId !== authUser?.id && (
            <Button
              status={inActivity ? 'danger' : 'primary'}
              onPress={onPressJoin}
              style={{ marginTop: 8 }}
            >
              {inActivity ? 'Leave' : 'Join'}
            </Button>
          )}
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 48,
    paddingHorizontal: 20,
  },
});

export default PostDetail;
