import type { AppProps } from 'next/app';
import Header from '../components/header/Header';
import '../styles/global.css';
import { FunctionComponent, useEffect, useState } from 'react';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }): JSX.Element => {

  const [isDarkMode, setIsDarkMode] = useState<boolean>();

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])
  
  return (
    <div className={`${isDarkMode ? 'tw-dark' : 'tw-light'}`}>
      <div className='tw-absolute tw-top-0 tw-left-0 tw-flex tw-flex-col tw-min-h-screen tw-min-w-full tw-font-rubik tw-bg-background-light tw-text-font-light dark:tw-bg-background-dark dark:tw-text-font-dark'>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
      <div className='tw-w-[calc(100%-32px)] tw-xl:tw-w-[70vw] tw-mx-auto tw-max-w-[2000px] tw-p-4'>
        <Component {...pageProps} />
      </div>
      </div>
    </div>
  );
}

export default App;