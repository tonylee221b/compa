import uuid from 'react-native-uuid';
import { Collection } from './db';

export interface DbUser {
  id: string;
  name: string;
  bio: string;
  password: string;
}

const userDb = new Collection<DbUser>('user');

export async function getUser(userId: string): Promise<DbUser | undefined> {
  return userDb.get(userId);
}

export async function register(
  data: Pick<DbUser, 'name' | 'bio' | 'password'>
): Promise<DbUser> {
  const user: DbUser = {
    ...data,
    id: uuid.v4() as string,
  };
  userDb.put(user.id, user);
  return user;
}

export async function login(data: { name: string; password: string }) {
  const user = userDb.getAll().find((user) => user.name === data.name);
  if (!user) {
    throw new Error('User not found');
  }
  const isValid = data.password === user.password;
  if (!isValid) {
    throw new Error('Invalid password');
  }
  return user;
}
