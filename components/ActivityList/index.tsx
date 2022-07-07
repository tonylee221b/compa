import { Divider, List } from '@ui-kitten/components';
import React from 'react';
import { DbActivity } from '../../backend';
import { ActivityListItem } from '../ActivityListItem';

export interface ActivityListProps {
  activities: DbActivity[];
  onJoin?(id: string): void;
}

export const ActivityList = ({ activities, onJoin }: ActivityListProps) => {
  return (
    <List
      ItemSeparatorComponent={Divider}
      data={activities}
      renderItem={({ item }) => (
        <ActivityListItem onJoin={onJoin} activity={item} />
      )}
    />
  );
};
