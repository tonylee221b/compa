import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Icon, Layout } from '@ui-kitten/components';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { DbActivity, getJoinedActivities } from '../../backend';
import { JoinedActivityList } from '../../components/JoinedActivityList';
import { useAuthUserContext } from '../../context/AuthUserContext';

export interface MyActivitiesScreenProps
  extends NativeStackScreenProps<any, any> {}

export const MyActivitiesScreen = ({ navigation }: MyActivitiesScreenProps) => {
  const { authUser } = useAuthUserContext();
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

  return (
    <Layout style={styles.container}>
      <Button
        accessoryLeft={<Icon name="plus-circle" />}
        onPress={() => navigation.navigate('CreateActivity')}
      >
        Create new activity
      </Button>

      <Layout style={{ marginTop: 16 }}>
        <JoinedActivityList onLeave={onLeavePress} activities={activities} />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});
