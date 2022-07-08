import { Divider, List, ListItem } from '@ui-kitten/components';
import React from 'react';
import { DbActivity } from '../../backend';
import { ActivityListItem } from '../ActivityListItem';
import { JoinedActivityListItem } from '../JoinedActivityListItem';

export interface JoinedActivityListProps {
  activities: DbActivity[];
  onLeave?(id: string): void;
}

export const JoinedActivityList = ({
  activities,
  onLeave,
}: JoinedActivityListProps) => {
  return (
    <List
      style={{ maxHeight: 450 }}
      ItemSeparatorComponent={Divider}
      data={activities}
      renderItem={({ item }) => (
        <JoinedActivityListItem onLeave={onLeave} activity={item} />
      )}
    />
  );
};
