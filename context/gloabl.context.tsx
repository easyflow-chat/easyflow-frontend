import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, createContext } from 'react';
import { Socket } from 'socket.io-client';
import { UserType } from '../types/user.type';
import { emitUnboundError } from './context.utils';

interface GlobalContextType {
  user?: UserType;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
  profilePicture?: string;
  setProfilePicture: Dispatch<SetStateAction<string | undefined>>;
  hideHeader?: boolean;
  setHideHeader: Dispatch<SetStateAction<boolean>>;
  webSocket?: Socket;
  setWebSocket?: Dispatch<SetStateAction<Socket | undefined>>;
}
const GlobalContext = createContext<GlobalContextType>({
  setUser: emitUnboundError,
  user: undefined,
  setProfilePicture: emitUnboundError,
  profilePicture: undefined,
  setHideHeader: emitUnboundError,
  hideHeader: undefined,
  setWebSocket: emitUnboundError,
  webSocket: undefined,
});

const GlobalContextProvider: FunctionComponent<PropsWithChildren<GlobalContextType>> = ({
  user,
  setUser,
  profilePicture,
  setProfilePicture,
  hideHeader,
  setHideHeader,
  webSocket,
  setWebSocket,
  children,
}) => {
  return (
    <GlobalContext.Provider
      value={{
        setUser,
        user,
        profilePicture,
        setProfilePicture,
        hideHeader,
        setHideHeader,
        webSocket,
        setWebSocket,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
export { GlobalContext };
