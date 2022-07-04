import { Button, Card, Text } from '@ui-kitten/components';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DbActivity, DbUser } from '../../backend';

export interface ActivityListItemProps {
  activity: DbActivity;
}

export const ActivityListItem = ({ activity }: ActivityListItemProps) => {
  const onJoinPress = () => console.log('Join pressed');
  const onViewPress = () => console.log('View pressed');

  const cardHeader = (
    <View>
      <View style={styles.header}>
        <Text category="h3">{activity.title}</Text>
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
      <Text>
        Start date: {dayjs(activity.startDate).format('MMM DD, YYYY')}
      </Text>
      <Text>{activity.userId}</Text>
      <Text>{activity.googleMapUrl}</Text>
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
});
