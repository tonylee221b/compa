import { Button, Card, Icon, Layout, Text } from '@ui-kitten/components';
import dayjs from 'dayjs';
import React, { ReactNode, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import {
  addParticipant,
  DbActivity,
  DbUser,
  getUser,
  isInActivity,
  leaveActivity,
} from '../../backend';
import { useNavigation } from '@react-navigation/native';
import { useAuthUserContext } from '../../context/AuthUserContext';
import { Details } from '../Details';
import { getPlaceDetail, Place } from '../../backend/location-service';

export interface ActivityListItemProps {
  activity: DbActivity;
  onJoin?(id: string): void;
}

export const ActivityListItem = ({
  activity,
  onJoin,
}: ActivityListItemProps) => {
  const [user, setUser] = useState<DbUser | undefined>();
  const navigation = useNavigation<any>();
  const { authUser } = useAuthUserContext();

  const [place, setPlace] = useState<Place>();

  useEffect(() => {
    if (activity.placeId) {
      getPlaceDetail(activity.placeId)
        .then(setPlace)
        .catch((err) => Alert.alert('Error', err.message));
    }
  }, [activity.placeId]);
  useEffect(
    function fetchUser() {
      getUser(activity.userId).then(setUser);
    },
    [activity.userId]
  );

  const onJoinPress = async () => {
    if (!authUser) return;
    try {
      await addParticipant(activity.id, authUser);
      onJoin?.(activity.id);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };
  const onViewPress = () => navigation.navigate('PostDetail', { activity });

  const cardHeader = (
    <Layout>
      <Layout style={styles.header}>
        <Layout>
          <Text category="h3">{activity.title}</Text>
          {user && <Text category="s1">with {user.name}</Text>}
        </Layout>
        <Text>
          {activity.participants.length}/{activity.limit} participants
        </Text>
      </Layout>
    </Layout>
  );
  const cardFooter = (
    <Layout>
      <Layout style={styles.buttons}>
        <Button
          onPress={onViewPress}
          style={styles.button}
          size="small"
          appearance="outline"
        >
          View
        </Button>

        <Button onPress={onJoinPress} style={styles.button} size="small">
          Join
        </Button>
      </Layout>
    </Layout>
  );

  return (
    <Card status="basic" header={cardHeader} footer={cardFooter}>
      <Text>{activity.description}</Text>

      <Details
        label="Start date"
        value={dayjs(activity.startDate).format('MMM DD, YYYY')}
      />

      {place && <Details label="Location" value={place.formatted_address} />}
      {place && (
        <Image
          style={{
            marginTop: 16,
            height: 100,
          }}
          source={{ uri: place.staticMapLink }}
        />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 4,
    marginRight: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    marginRight: 4,
    marginLeft: 4,
    fill: 'white',
  },
});
