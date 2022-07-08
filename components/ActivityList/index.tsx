import { Divider, Layout, List, Text } from '@ui-kitten/components';
import React from 'react';
import { DbActivity } from '../../backend';
import { ActivityListItem } from '../ActivityListItem';

export interface ActivityListProps {
  activities: DbActivity[];
  onJoin?(id: string): void;
}

export const ActivityList = ({ activities, onJoin }: ActivityListProps) => {
  return (
    <Layout>
      {activities.length === 0 && <Text>(No results)</Text>}
      <List
        ItemSeparatorComponent={Divider}
        data={activities}
        renderItem={({ item }) => (
          <ActivityListItem onJoin={onJoin} activity={item} />
        )}
      />
    </Layout>
  );
};
