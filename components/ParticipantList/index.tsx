import { Layout, List, ListItem, Text } from '@ui-kitten/components';
import React from 'react';
import { Participant } from '../../backend';
import { ParticipantListItem } from '../ParticipantListItem';

export interface ParticipantListProps {
  participants: Participant[];
}

export const ParticipantList = (props: ParticipantListProps) => {
  return (
    <Layout>
      <Text category="s1">Participants</Text>
      {props.participants.length === 0 && <Text>(No participants)</Text>}
      <List
        data={props.participants}
        renderItem={({ item }) => (
          <ListItem>
            <ParticipantListItem participant={item} />
          </ListItem>
        )}
      />
    </Layout>
  );
};
