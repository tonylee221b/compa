import { Divider, List } from '@ui-kitten/components';
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
      ItemSeparatorComponent={Divider}
      data={activities}
      renderItem={({ item }) => (
        <JoinedActivityListItem onLeave={onLeave} activity={item} />
      )}
    />
  );
};
