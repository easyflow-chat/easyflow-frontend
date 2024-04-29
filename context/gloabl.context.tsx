import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, createContext } from 'react';
import { UserType } from '../types/user.type';
import { emitUnboundError } from './context.utils';

interface GlobalContextType {
  user?: UserType;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
  profilePicture?: string;
  setProfilePicture?: Dispatch<SetStateAction<string | undefined>>;
}
const GlobalContext = createContext<GlobalContextType>({
  setUser: emitUnboundError,
  user: undefined,
  setProfilePicture: emitUnboundError,
  profilePicture: undefined,
});

const GlobalContextProvider: FunctionComponent<PropsWithChildren<GlobalContextType>> = ({
  user,
  setUser,
  profilePicture,
  setProfilePicture,
  children,
}) => {
  return (
    <GlobalContext.Provider
      value={{
        setUser,
        user,
        profilePicture,
        setProfilePicture,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
export { GlobalContext };
