import '@easyflow-chat/easyflow-web-components/dist/css/styles.css';
import { defineCustomElements } from '@easyflow-chat/easyflow-web-components/loader';
import { appWithTranslation, useTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { FunctionComponent, useEffect, useState } from 'react';
import Header from '../components/header/Header';
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
  const [profilePicture, setProfilePicture] = useState<string>();
  const [user, setUser] = useState<UserType>();
  const [acceptedCookies, setAcceptedCookies] = useState<boolean>(true);
  const [hideHeader, setHideHeader] = useState<boolean>(false);

  const { isLoading, fetchDataWithLoadingTimeout } = useFetch();
  const { t } = useTranslation(I18nNamespace.COMMON);

  useEffect(() => {
    defineCustomElements(window);
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        className={`${isDarkMode ? 'ewc--dark tw-dark' : 'ewc--light'} tw-min-w-screen tw-flex tw-min-h-screen tw-transform-gpu tw-flex-col tw-overflow-auto tw-overflow-x-hidden tw-bg-ewc-lavender-tint-1 tw-font-rubik tw-text-ewc-black tw-transition-colors tw-duration-200 dark:tw-bg-ewc-black dark:tw-text-ewc-lavender-tint-2`}
      >
        {isLoading && (
          <div className="tw-flex tw-h-[100vh] tw-items-center tw-justify-center">
            <ewc-loader size={50} strokeInherit />
          </div>
        )}
        {!acceptedCookies && !isLoading && (
          <div className="tw-flex tw-h-[100vh] tw-flex-col tw-items-center tw-justify-center">
            <h2>{t('cookies.title')}</h2>
            <p className="tw-text-center">{t('cookies.message')}</p>
            <ewc-button
              onClick={() => {
                window.localStorage.setItem('acceptedCookies', 'true');
                setAcceptedCookies(true);
              }}
              label={t('cookies.acknowledge')}
            />
          </div>
        )}
        {!isLoading && acceptedCookies && (
          <>
            {!hideHeader && <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
            <NotificationsProvider>
              <div className="tw-xl:tw-w-[70vw] tw-mx-auto tw-h-[calc(100vh-113px)] tw-w-[calc(100%-32px)] tw-max-w-[2000px] tw-p-4">
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
