import { Button, Card, Icon, Layout, Text } from '@ui-kitten/components';
import dayjs from 'dayjs';
import React, { ReactNode, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
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

export interface ActivityListItemProps {
  activity: DbActivity;
  onJoin?(id: string): void;
}

interface DetailsProps {
  label: string;
  value: string;

  iconName?: string;
}

const Details = ({ label, value, iconName }: DetailsProps) => {
  return (
    <Layout style={styles.details}>
      <Layout style={styles.row}>
        <Text category="s1">{label}</Text>
        {iconName && <Icon style={styles.icon} name={iconName} />}
      </Layout>

      <Text category="p1">{value}</Text>
    </Layout>
  );
};

export const ActivityListItem = ({
  activity,
  onJoin,
}: ActivityListItemProps) => {
  const [user, setUser] = useState<DbUser | undefined>();
  const navigation = useNavigation<any>();
  const { authUser } = useAuthUserContext();

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
        iconName="calendar"
        value={dayjs(activity.startDate).format('MMM DD, YYYY')}
      />

      {activity.placeId && (
        <Details label="Google map" iconName="map" value={activity.placeId} />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    marginTop: 8,
  },
});
