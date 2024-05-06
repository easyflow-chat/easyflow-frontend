import { appWithTranslation, useTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { FunctionComponent, useEffect, useState } from 'react';
import Button from '../components/button/Button';
import Header from '../components/header/Header';
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner';
import NotificationsProvider from '../components/notification/NotificationProvider';
import NEXT_I18NEXT_CONFIG from '../config/i18n.config';
import GlobalContextProvider from '../context/gloabl.context';
import { I18nNamespace } from '../enums/i18n.enum';
import useFetch from '../hooks/useFetch';
import { APIOperation } from '../services/api-services/common';
import '../styles/global.css';
import { UserType } from '../types/user.type';

const App: FunctionComponent<AppProps & { viewport: string }> = ({ Component, pageProps }): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>();
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserType>();
  const [acceptedCookies, setAcceptedCookies] = useState<boolean>(true);
  const [hideHeader, setHideHeader] = useState<boolean>(false);

  const { isLoading, fetchDataWithLoadingTimeout } = useFetch();
  const { t } = useTranslation(I18nNamespace.COMMON);

  useEffect(() => {
    const darkMode = window.localStorage.getItem('darkMode');
    if (darkMode) {
      setIsDarkMode(darkMode === 'true' ? true : false);
    } else {
      setIsDarkMode(Boolean(window.matchMedia('(prefers-color-scheme: dark)').matches));
    }
    const reqUser = async (): Promise<void> => {
      const res = await fetchDataWithLoadingTimeout({ op: APIOperation.GET_USER });
      if (res.success) {
        setUser(res.data);
      }
    };
    void reqUser();
    setAcceptedCookies(window.localStorage.getItem('acceptedCookies') === 'true' ? true : false);
  }, []);

  useEffect(() => {
    if (isDarkMode !== undefined) {
      window.localStorage.setItem('darkMode', isDarkMode.toString());
    }
  }, [isDarkMode]);

  useEffect(() => {
    const getProfilePicture = async (): Promise<void> => {
      if (user) {
        const res = await fetchDataWithLoadingTimeout({
          op: APIOperation.GET_PROFILE_PICTURE,
        });
        if (res.success) {
          setProfilePicture(res.data);
        }
      }
    };
    void getProfilePicture();
  }, [user]);

  return (
    <GlobalContextProvider
      user={user}
      setUser={setUser}
      profilePicture={profilePicture}
      setProfilePicture={setProfilePicture}
      hideHeader={hideHeader}
      setHideHeader={setHideHeader}
    >
      <div
        className={`${isDarkMode ? 'tw-dark' : ''} tw-min-w-screen tw-flex tw-min-h-screen tw-transform-gpu tw-flex-col tw-overflow-scroll tw-bg-gradient-to-br tw-from-cyan-300/20 tw-via-purple-500/20 tw-to-blue-500/20 tw-font-rubik tw-text-black tw-transition-colors tw-duration-200 dark:tw-bg-black dark:tw-text-white`}
      >
        {isLoading && (
          <div className="tw-flex tw-h-[100vh] tw-items-center tw-justify-center">
            <LoadingSpinner size="16" />
          </div>
        )}
        {!acceptedCookies && !isLoading && (
          <div className="tw-flex tw-h-[100vh] tw-flex-col tw-items-center tw-justify-center">
            <h2>{t('cookies.title')}</h2>
            <p className="tw-text-center">{t('cookies.message')}</p>
            <Button
              onClick={() => {
                window.localStorage.setItem('acceptedCookies', 'true');
                setAcceptedCookies(true);
              }}
              invertedStyle
            >
              {t('cookies.acknowledge')}
            </Button>
          </div>
        )}
        {!isLoading && acceptedCookies && (
          <>
            {!hideHeader && <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
            <NotificationsProvider>
              <div className="tw-xl:tw-w-[70vw] tw-mx-auto tw-h-full tw-min-h-[calc(100vh-113px)] tw-w-[calc(100%-32px)] tw-max-w-[2000px] tw-p-4">
                <Component {...pageProps} />
              </div>
            </NotificationsProvider>
          </>
        )}
      </div>
    </GlobalContextProvider>
  );
};

export default appWithTranslation(App, {
  ...NEXT_I18NEXT_CONFIG,
  returnNull: false,
});
