import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, createContext } from 'react';
import { UserType } from '../types/user.type';
import { emitUnboundError } from './context.utils';

interface GlobalContextType {
  user?: UserType;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
}
const GlobalContext = createContext<GlobalContextType>({
  setUser: emitUnboundError,
  user: undefined,
});

const GlobalContextProvider: FunctionComponent<PropsWithChildren<GlobalContextType>> = ({
  user,
  setUser,
  children,
}) => {
  return (
    <GlobalContext.Provider
      value={{
        setUser,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
export { GlobalContext };
