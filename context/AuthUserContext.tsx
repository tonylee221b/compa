import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import { DbUser, login } from '../backend';
export interface AuthUserContext {
  authUser: DbUser | undefined;
  setUser(name: 'andrew' | 'thomas' | 'tony'): void;
}
const Context = createContext<AuthUserContext | undefined>(undefined);

export interface AuthUserProviderProps {
  children: ReactNode | ReactNode[];
}
export const AuthUserProvider = (props: AuthUserProviderProps) => {
  const [authUser, setAuthUser] = useState<DbUser | undefined>();

  useEffect(function auth() {
    login({
      name: 'Andrew',
      password: 'Abcd@1234',
    })
      .then(setAuthUser)
      .catch(console.error);
  }, []);

  const value: AuthUserContext = useMemo(() => {
    const setUser: AuthUserContext['setUser'] = (name) => {
      switch (name) {
        case 'andrew':
          login({ name: 'Andrew', password: 'Abcd@1234' })
            .then(setAuthUser)
            .catch(() => Alert.alert('Error', 'Login failed'));
          return;

        case 'thomas':
          login({ name: 'Thomas', password: 'Abcd@1234' })
            .then(setAuthUser)
            .catch(() => Alert.alert('Error', 'Login failed'));
          return;

        case 'tony':
          login({ name: 'Tony', password: 'Abcd@1234' })
            .then(setAuthUser)
            .catch(() => Alert.alert('Error', 'Login failed'));
          return;

        default:
          throw new Error('Invalid user');
      }
    };
    return {
      authUser,
      setUser,
    };
  }, [authUser, login]);
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const useAuthUserContext = (): AuthUserContext => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('Must be use within AuthUserContext');
  }

  return context;
};
