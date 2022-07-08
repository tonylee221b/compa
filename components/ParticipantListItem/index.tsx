import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { Participant } from '../../backend';

export interface ParticipantListItemProps {
  participant: Participant;
}

export const ParticipantListItem = (props: ParticipantListItemProps) => {
  return (
    <Layout>
      <Text>{props.participant.name}</Text>
    </Layout>
  );
};
