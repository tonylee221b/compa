import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { DbUser, login } from '../backend';
export interface AuthUserContext {
  authUser: DbUser | undefined;
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
    return {
      authUser,
    };
  }, [authUser]);
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const useAuthUserContext = (): AuthUserContext => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('Must be use within AuthUserContext');
  }

  return context;
};
