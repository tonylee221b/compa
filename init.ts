import {
  addParticipant,
  createActivity,
  leaveActivity,
  login,
  register,
} from './backend';

async function initUsers() {
  const userAndrew = await register({
    name: 'Andrew',
    bio: 'Hello my name is Andrew',
    password: 'Abcd@1234',
  });

  const userTony = await register({
    name: 'Tony',
    bio: 'Hello my name is Tony',
    password: 'Abcd@1234',
  });

  const userThomas = await register({
    name: 'Thomas',
    bio: 'Hello my name is Thomas',
    password: 'Abcd@1234',
  });

  return { userAndrew, userTony, userThomas };
}

export async function init() {
  const { userAndrew, userThomas, userTony } = await initUsers();

  const biking = await createActivity({
    city: 'Toronto',
    description: "Let's go biking",
    placeId: 'ChIJrTLr-GyuEmsRBfy61i59si0',
    limit: 2,
    startDate: '2023-01-01',
    title: 'Biking',
    userId: userAndrew.id,
  });

  const coffee = await createActivity({
    city: 'Toronto',
    description: "Let's go cafe",
    placeId: 'ChIJrTLr-GyuEmsRBfy61i59si0',
    limit: 1,
    startDate: '2022-08-01',
    title: 'Coffee',
    userId: userTony.id,
  });

  const beer = await createActivity({
    city: 'Toronto',
    description: "Let's go beer",
    placeId: 'ChIJrTLr-GyuEmsRBfy61i59si0',
    limit: 100,
    startDate: '2023-01-01',
    title: 'Beer',
    userId: userThomas.id,
  });

  await addParticipant(beer.id, userAndrew);
  await addParticipant(beer.id, userTony);
  await addParticipant(coffee.id, userThomas);
}
