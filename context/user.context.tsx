import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, createContext } from 'react';
import { UserType } from '../types/user.type';
import { emitUnboundError } from './context.utils';

interface UserContextType {
  user?: UserType;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
  accessToken?: string;
  setAccessToken: Dispatch<SetStateAction<string | undefined>>;
}
const UserContext = createContext<UserContextType>({ setUser: emitUnboundError, setAccessToken: emitUnboundError, user: undefined, accessToken: undefined });

const UserContextProvider: FunctionComponent<PropsWithChildren<UserContextType>> = ({ user, accessToken, setUser, setAccessToken, children }) => {
  return (
    <UserContext.Provider
      value={{
        setUser,
        setAccessToken,
        user,
        accessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export { UserContext };
