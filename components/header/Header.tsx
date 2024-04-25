import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { Dispatch, FunctionComponent, SetStateAction, useContext, useRef, useState } from 'react';
import NEXT_I18NEXT_CONFIG from '../../config/i18n.config';
import { GlobalContext } from '../../context/gloabl.context';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import Button from '../Button/Button';
import Dropdown from '../dropdown/Dropdown';
import Toggle from '../toggle/Toggle';

interface HeaderProps {
  isDarkMode: boolean | undefined;
  setIsDarkMode: Dispatch<SetStateAction<boolean | undefined>>;
}

const Header: FunctionComponent<HeaderProps> = ({ isDarkMode, setIsDarkMode }): JSX.Element => {
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useDetectOutsideClick(hamburgerRef, setIsOpen);
  const { user } = useContext(GlobalContext);
  const router = useRouter();
  return (
    <header className="tw-sticky tw-top-0 tw-z-50 tw-flex tw-h-20 tw-w-full tw-items-center tw-justify-between tw-border tw-border-x-0 tw-border-t-0 tw-border-solid tw-border-gray-200 tw-bg-white/20 tw-backdrop-blur-xl dark:tw-border-gray-800 dark:tw-bg-black/20">
      <img src="/images/logo.png" alt="logo" className="tw-m-4" />
      <div className="tw-hidden tw-items-center xl:tw-flex">
        <Toggle isValue={isDarkMode} setValue={setIsDarkMode} />
        <Dropdown
          value={router.locale?.toUpperCase()}
          options={NEXT_I18NEXT_CONFIG.i18n.locales
            .filter(val => val !== 'placeholder')
            .map(local => local.toUpperCase())}
          onChange={async val => {
            await router.replace(router.asPath, router.asPath, { locale: val.toLowerCase() });
            setCookie('lang', val.toLowerCase(), { sameSite: 'lax', path: '/' });
          }}
        />
        {!user && (
          <>
            <div className="tw-m-2">
              <Button onClick={() => router.push('/signup')} invertedStyle={true}>
                Signup
              </Button>
            </div>
            <div className="tw-m-2">
              <Button onClick={() => router.push('/login')}>Login</Button>
            </div>
          </>
        )}
      </div>
      <div className="xl:tw-hidden" ref={hamburgerRef}>
        <label className="tw-peer/hamburger-label tw-m-2 tw-flex tw-flex-col">
          <input
            type="checkbox"
            className="tw-peer/hamburger tw-hidden"
            checked={isOpen}
            onClick={() => setIsOpen(val => !val)}
          />
          <span className="tw-m-1 tw-h-1 tw-w-[34px] tw-origin-right tw-rounded-full tw-bg-black tw-transition-transform tw-duration-300 peer-checked/hamburger:tw--rotate-45 dark:tw-bg-white" />
          <span className="tw-m-1 tw-h-1 tw-w-[34px] tw-rounded-full tw-bg-black tw-transition-opacity tw-duration-300 peer-checked/hamburger:tw-opacity-0 dark:tw-bg-white" />
          <span className="tw-m-1 tw-h-1 tw-w-[34px] tw-origin-right tw-rounded-full tw-bg-black tw-transition-transform tw-duration-300 peer-checked/hamburger:tw-rotate-45 dark:tw-bg-white" />
        </label>
        <div className="tw-absolute tw-right-0 tw-top-20 tw-h-[calc(100vh-80px)] tw-w-0 tw-overflow-hidden tw-pb-5 tw-backdrop-blur-md tw-transition-width tw-duration-300 peer-has-[input:checked]/hamburger-label:tw-w-[calc(100vw)]">
          <div className="tw-flex tw-flex-col tw-items-center tw-p-4">
            {!user && (
              <div className="tw-mb-2">
                <div
                  className="tw-group/login tw-flex tw-items-center tw-justify-end"
                  onClick={async () => {
                    setIsOpen(false);
                    await router.push('/login');
                  }}
                >
                  <p className="tw-my-3 tw-text-2xl tw-font-bold tw-text-inherit tw-no-underline group-hover/login:tw-underline">
                    Login
                  </p>
                  <img
                    src="/images/down-arrow.svg"
                    alt="Down arrow"
                    className="tw-ml-2 tw-h-4 tw-w-4 tw-origin-center tw-rotate-[270deg] tw-transition-transform tw-duration-300 group-hover/login:tw-translate-x-1 dark:tw-invert"
                  />
                </div>
                <div
                  className="tw-group/login tw-flex tw-items-center tw-justify-end"
                  onClick={async () => {
                    setIsOpen(false);
                    await router.push('/signup');
                  }}
                >
                  <p className="tw-my-3 tw-text-2xl tw-font-bold group-hover/login:tw-underline">Signup</p>
                  <img
                    src="/images/down-arrow.svg"
                    alt="Down arrow"
                    className="tw-ml-2 tw-h-4 tw-w-4 tw-origin-center tw-rotate-[270deg] tw-transition-transform tw-duration-300 group-hover/login:tw-translate-x-1 dark:tw-invert"
                  />
                </div>
              </div>
            )}
            <div className="tw-flex tw-items-center">
              <Toggle
                isValue={isDarkMode}
                setValue={setIsDarkMode}
                onChange={() => {
                  setCookie('dark_mode', !isDarkMode, { sameSite: 'lax', path: '/' });
                }}
              />
              <Dropdown
                value={router.locale?.toUpperCase()}
                options={NEXT_I18NEXT_CONFIG.i18n.locales
                  .filter(val => val !== 'placeholder')
                  .map(local => local.toUpperCase())}
                onChange={val => router.replace(router.asPath, router.asPath, { locale: val.toLowerCase() })}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
