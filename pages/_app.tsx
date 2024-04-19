import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { FunctionComponent, useEffect, useState } from 'react';
import Header from '../components/header/Header';
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner';
import NotificationsProvider from '../components/notification/NotificationProvider';
import NEXT_I18NEXT_CONFIG from '../config/i18n.config';
import UserContextProvider from '../context/user.context';
import useFetch from '../hooks/useFetch';
import { APIOperation } from '../services/api-services/common';
import '../styles/global.css';
import { UserType } from '../types/user.type';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>();
  const [user, setUser] = useState<UserType>();
  const { isLoading, fetchDataWithLoadingTimeout } = useFetch();

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    const reqUser = async (): Promise<void> => {
      const res = await fetchDataWithLoadingTimeout({ op: APIOperation.GET_USER });
      if (res.success) {
        setUser(res.data);
      }
    };
    void reqUser();
  }, [setIsDarkMode, fetchDataWithLoadingTimeout]);

  return (
    <UserContextProvider user={user} setUser={setUser}>
      <div
        className={`${isDarkMode ? 'tw-dark' : 'tw-light'} tw-min-w-screen tw-flex tw-min-h-screen tw-flex-col tw-bg-white tw-font-rubik tw-text-black tw-transition-colors tw-duration-200  dark:tw-bg-black dark:tw-text-white`}
      >
        {isLoading && (
          <div className="tw-flex tw-h-[100vh] tw-items-center tw-justify-center">
            <LoadingSpinner size="16" />
          </div>
        )}
        {!isLoading && (
          <>
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <NotificationsProvider>
              <div className="tw-xl:tw-w-[70vw] tw-mx-auto tw-min-h-[calc(100vh-113px)] tw-w-[calc(100%-32px)] tw-max-w-[2000px] tw-p-4">
                <Component {...pageProps} />
              </div>
            </NotificationsProvider>
          </>
        )}
      </div>
    </UserContextProvider>
  );
};
export default appWithTranslation(App, {
  ...NEXT_I18NEXT_CONFIG,
  returnNull: false,
});
