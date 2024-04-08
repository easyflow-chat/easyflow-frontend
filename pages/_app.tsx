import type { AppProps } from 'next/app';
import { FunctionComponent, useEffect, useState } from 'react';
import NotificationsProvider from '../components/Notification/NotificationProvider';
import Header from '../components/header/Header';
import UserContextProvider from '../context/user.context';
import '../styles/global.css';
import { UserType } from '../types/user.type';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>();
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  return (
    <div className={`${isDarkMode ? 'tw-dark' : 'tw-light'} tw-transition-colors tw-duration-700`}>
      <UserContextProvider user={user} accessToken={accessToken} setUser={setUser} setAccessToken={setAccessToken}>
        <div className="tw-absolute tw-left-0 tw-top-0 tw-flex tw-min-h-screen tw-min-w-full tw-flex-col tw-bg-white tw-font-rubik tw-text-black dark:tw-bg-black dark:tw-text-white">
          <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <NotificationsProvider>
            <div className="tw-xl:tw-w-[70vw] tw-mx-auto tw-w-[calc(100%-32px)] tw-max-w-[2000px] tw-p-4">
              <Component {...pageProps} />
            </div>
          </NotificationsProvider>
        </div>
      </UserContextProvider>
    </div>
  );
};
export default App;
