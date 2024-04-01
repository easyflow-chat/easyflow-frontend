import type { AppProps } from 'next/app';
import { FunctionComponent, useEffect, useState } from 'react';
import Header from '../components/header/Header';
import '../styles/global.css';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>();

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  return (
    <div className={`${isDarkMode ? 'tw-dark' : 'tw-light'}`}>
      <div className="tw-absolute tw-left-0 tw-top-0 tw-flex tw-min-h-screen tw-min-w-full tw-flex-col tw-bg-white tw-font-rubik tw-text-black dark:tw-bg-black dark:tw-text-white">
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className="tw-xl:tw-w-[70vw] tw-mx-auto tw-w-[calc(100%-32px)] tw-max-w-[2000px] tw-p-4">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default App;
