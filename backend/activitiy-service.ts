import dayjs from 'dayjs';
import uuid from 'react-native-uuid';
import { Collection } from './db';
import { DbUser } from './user-service';

const activityDb = new Collection<DbActivity>('activity');

export type Participant = Pick<DbUser, 'id' | 'name'>;

export interface DbActivity {
  id: string;
  userId: string;
  title: string;
  description: string;
  limit: number;
  participants: Participant[];
  startDate: string;
  createdAt: string;
  updatedAt: string;
  placeId?: string;
  city: string;
  contact: string;
}

export async function createActivity(
  data: Pick<
    DbActivity,
    | 'title'
    | 'description'
    | 'placeId'
    | 'limit'
    | 'userId'
    | 'startDate'
    | 'city'
    | 'contact'
  >
) {
  const activity: DbActivity = {
    ...data,
    id: uuid.v4() as string,
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  activityDb.put(activity.id, activity);
  return activity;
}

export async function getActivity(id: string): Promise<DbActivity | undefined> {
  return activityDb.get(id);
}

export async function getActivities(
  city: string,
  userId: string
): Promise<DbActivity[]> {
  const joinedActivities = await getJoinedActivities(userId);
  return activityDb
    .getAll()
    .filter(
      (activity) =>
        activity.city.toLowerCase() === city.toLowerCase() &&
        dayjs(activity.startDate).isAfter(dayjs()) &&
        !joinedActivities.map((a) => a.id).includes(activity.id)
    );
}

export async function getJoinedActivities(
  userId: string
): Promise<DbActivity[]> {
  return activityDb
    .getAll()
    .filter(
      (activity) =>
        activity.userId === userId ||
        activity.participants.some((p) => p.id === userId)
    );
}

export async function addParticipant(
  activityId: string,
  participant: DbActivity['participants'][number]
) {
  const activity = await getActivity(activityId);
  if (!activity) {
    throw new Error('Activity not found');
  }
  if (activity.userId === participant.id) {
    throw new Error("You can't join your own activity");
  }
  if (await isInActivity(activity.id, participant.id)) {
    throw new Error('User already joined');
  }
  if (activity.participants.length >= activity.limit) {
    throw new Error('Activity is full');
  }
  activityDb.update(activityId, {
    participants: [...activity.participants, participant],
  });
}

export async function leaveActivity(activityId: string, userId: string) {
  const activity = await getActivity(activityId);
  if (!activity) {
    throw new Error('Activity not found');
  }
  if (activity.userId === userId) {
    throw new Error("You can't leave your own activity");
  }
  activityDb.update(activityId, {
    participants: activity.participants.filter((p) => p.id !== userId),
  });
}

export async function isInActivity(
  activityId: string,
  userId: string
): Promise<boolean> {
  const activity = await getActivity(activityId);
  if (!activity) {
    throw new Error('Activity not found');
  }
  return activity.participants.some((p) => p.id === userId);
}

export async function deleteActivity(activityId: string): Promise<void> {
  activityDb.delete(activityId);
}
