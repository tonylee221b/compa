import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, ButtonGroup, Icon, Layout, Text } from '@ui-kitten/components';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { DbActivity, getJoinedActivities } from '../../backend';
import { JoinedActivityList } from '../../components/JoinedActivityList';
import { useAuthUserContext } from '../../context/AuthUserContext';

export interface MyActivitiesScreenProps
  extends NativeStackScreenProps<any, any> {}

export const MyActivitiesScreen = ({ navigation }: MyActivitiesScreenProps) => {
  const { authUser, setUser } = useAuthUserContext();
  const [activities, setActivities] = useState<DbActivity[]>([]);

  useFocusEffect(
    useCallback(
      function fetchActivities() {
        if (authUser?.id) {
          getJoinedActivities(authUser.id).then(setActivities);
        }
      },
      [authUser?.id]
    )
  );

  const onLeavePress = (id: string) =>
    setActivities((prev) => prev.filter((a) => a.id !== id));

  if (!authUser) return <Text>Loading...</Text>;

  return (
    <Layout style={styles.container}>
      <ButtonGroup size="tiny">
        <Button onPress={() => setUser('andrew')}>Login as Andrew</Button>
        <Button onPress={() => setUser('tony')}>Login as Tony</Button>
        <Button onPress={() => setUser('thomas')}>Login as Thomas</Button>
      </ButtonGroup>

      <Text style={{ marginTop: 16 }} category="h1">
        Hello, {authUser.name}
      </Text>

      <Button
        style={{ marginTop: 16 }}
        accessoryLeft={<Icon name="plus-circle" />}
        onPress={() => navigation.navigate('CreateActivity')}
      >
        Create new activity
      </Button>

      <Layout style={{ marginTop: 16 }}>
        <Text category="h6">Joined activities</Text>
        <Layout style={{ marginTop: 8 }}>
          <JoinedActivityList onLeave={onLeavePress} activities={activities} />
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 48,
    paddingHorizontal: 20,
  },
});
