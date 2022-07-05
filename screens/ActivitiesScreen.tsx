import { Button } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DbActivity, getActivities } from '../backend';
import { ActivityList } from '../components/ActivityList';
import { CreateActivityForm } from '../components/CreateActivityForm';

export interface ActivitiesScreenProps {
  city: string;
}

export const ActivitiesScreen = (props: ActivitiesScreenProps) => {
  const [activities, setActivities] = useState<DbActivity[]>([]);

  useEffect(function fetchActivities() {
    getActivities(props.city).then(setActivities);
  }, []);

  return (
    <View>
      <CreateActivityForm />
      <ActivityList activities={activities} />
    </View>
  );
};
