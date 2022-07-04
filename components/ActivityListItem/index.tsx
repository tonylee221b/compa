import { Button, Card, Icon, Text } from '@ui-kitten/components';
import dayjs from 'dayjs';
import React, { ReactNode, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DbActivity, DbUser, getUser } from '../../backend';

export interface ActivityListItemProps {
  activity: DbActivity;
}

interface DetailsProps {
  label: string;
  value: string;

  iconName?: string;
}

const Details = ({ label, value, iconName }: DetailsProps) => {
  return (
    <View style={styles.details}>
      <View style={styles.row}>
        <Text category="s1">{label}</Text>
        {iconName && <Icon style={styles.icon} name={iconName} />}
      </View>

      <Text category="p1">{value}</Text>
    </View>
  );
};

export const ActivityListItem = ({ activity }: ActivityListItemProps) => {
  const [user, setUser] = useState<DbUser | undefined>();

  useEffect(
    function fetchUser() {
      getUser(activity.userId).then(setUser);
    },
    [activity.userId]
  );

  const onJoinPress = () => console.log('Join pressed');
  const onViewPress = () => console.log('View pressed');

  const cardHeader = (
    <View>
      <View style={styles.header}>
        <View>
          <Text category="h3">{activity.title}</Text>
          {user && <Text category="s1">with {user.name}</Text>}
        </View>
        <Text>
          {activity.participants.length}/{activity.limit} participants
        </Text>
      </View>
    </View>
  );
  const cardFooter = (
    <View>
      <View style={styles.buttons}>
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
      </View>
    </View>
  );

  return (
    <Card status="basic" header={cardHeader} footer={cardFooter}>
      <Text>{activity.description}</Text>

      <Details
        label="Start date"
        iconName="calendar"
        value={dayjs(activity.startDate).format('MMM DD, YYYY')}
      />

      <Details
        label="Google map"
        iconName="map"
        value={activity.googleMapUrl}
      />
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    marginTop: 8,
  },
});
