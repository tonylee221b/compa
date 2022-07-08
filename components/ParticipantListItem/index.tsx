import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { Participant } from '../../backend';
import { useAuthUserContext } from '../../context/AuthUserContext';

export interface ParticipantListItemProps {
  participant: Participant;
}

export const ParticipantListItem = (props: ParticipantListItemProps) => {
  const { authUser } = useAuthUserContext();
  return (
    <Layout style={{ flexDirection: 'row' }}>
      <Text>{props.participant.name}</Text>

      {authUser?.id === props.participant.id && (
        <Text status="info" style={{ marginLeft: 4 }}>
          (You)
        </Text>
      )}
    </Layout>
  );
};
