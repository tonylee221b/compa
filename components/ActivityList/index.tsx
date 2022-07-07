import { Divider, List } from '@ui-kitten/components';
import React from 'react';
import { DbActivity } from '../../backend';
import { ActivityListItem } from '../ActivityListItem';

export interface ActivityListProps {
  activities: DbActivity[];
}

export const ActivityList = ({ activities }: ActivityListProps) => {
  return (
    <List
      ItemSeparatorComponent={Divider}
      data={activities}
      renderItem={({ item }) => <ActivityListItem activity={item} />}
    />
  );
};
