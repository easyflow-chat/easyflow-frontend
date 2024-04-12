import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, createContext } from 'react';
import { UserType } from '../types/user.type';
import { emitUnboundError } from './context.utils';

interface UserContextType {
  user?: UserType;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
}
const UserContext = createContext<UserContextType>({ setUser: emitUnboundError, user: undefined });

const UserContextProvider: FunctionComponent<PropsWithChildren<UserContextType>> = ({ user, setUser, children }) => {
  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export { UserContext };
