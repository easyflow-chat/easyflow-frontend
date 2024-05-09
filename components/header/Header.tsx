import { deleteCookie, setCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, FunctionComponent, SetStateAction, useContext, useRef, useState } from 'react';
import NEXT_I18NEXT_CONFIG from '../../config/i18n.config';
import { GlobalContext } from '../../context/gloabl.context';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import logo from '../../public/images/logo.svg';
import Button from '../button/Button';
import Dropdown from '../dropdown/Dropdown';
import Toggle from '../toggle/Toggle';

interface HeaderProps {
  isDarkMode: boolean | undefined;
  setIsDarkMode: Dispatch<SetStateAction<boolean | undefined>>;
}

const Header: FunctionComponent<HeaderProps> = ({ isDarkMode, setIsDarkMode }): JSX.Element => {
  const { user, setUser, profilePicture } = useContext(GlobalContext);
  const router = useRouter();
  const { t } = useTranslation();
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  useDetectOutsideClick(hamburgerRef, setIsHamburgerOpen);
  useDetectOutsideClick(profileRef, setIsProfileOpen);

  return (
    <header className="tw-sticky tw-top-0 tw-z-50 tw-flex tw-h-20 tw-w-full tw-justify-center tw-bg-transparent/25 tw-shadow-sm tw-shadow-black/20 tw-backdrop-blur-3xl">
      <div className="tw-flex tw-w-full tw-max-w-[2100px] tw-items-center tw-justify-between">
        <Link href="/" className="tw-mx-4">
          <Image src={logo} alt="Logo" className="tw-h-14 tw-w-14 dark:tw-invert" draggable="false" />
        </Link>
        <div className="tw-m-2 tw-ml-auto tw-hidden tw-items-center xl:tw-flex">
          <div className="tw-m-2">
            <Toggle isValue={isDarkMode} setValue={setIsDarkMode} />
          </div>
          <div className="tw-m-2">
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
          </div>
          {!user && (
            <>
              <div className="tw-m-2">
                <Button onClick={() => router.push('/login')}>{t('header.login')}</Button>
              </div>
              <div className="tw-m-2">
                <Button onClick={() => router.push('/signup')} invertedStyle>
                  {t('header.signup')}
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="tw-mx-4 tw-ml-auto xl:tw-hidden" ref={hamburgerRef}>
          <label className="tw-peer/label tw-flex tw-flex-col">
            <input
              type="checkbox"
              className="tw-peer/hamburger tw-hidden"
              checked={isHamburgerOpen}
              onChange={() => setIsHamburgerOpen(val => !val)}
            />
            <span className="tw-m-1 tw-h-1 tw-w-[34px] tw-origin-right tw-rounded-full tw-bg-black tw-transition-transform tw-duration-300 peer-checked/hamburger:tw--rotate-45 dark:tw-bg-white" />
            <span className="tw-m-1 tw-h-1 tw-w-[34px] tw-rounded-full tw-bg-black tw-transition-opacity tw-duration-300 peer-checked/hamburger:tw-opacity-0 dark:tw-bg-white" />
            <span className="tw-m-1 tw-h-1 tw-w-[34px] tw-origin-right tw-rounded-full tw-bg-black tw-transition-transform tw-duration-300 peer-checked/hamburger:tw-rotate-45 dark:tw-bg-white" />
          </label>
          <div className="tw-absolute tw-right-20 tw-top-20 tw-z-50 tw-m-3 tw-flex tw-h-fit tw-max-h-0 tw-w-fit tw-justify-end tw-overflow-hidden tw-rounded-2xl tw-bg-black/20 tw-backdrop-blur-lg tw-transition-max-height tw-duration-500 peer-has-[input:checked]/label:tw-max-h-screen">
            <div className="tw-m-8">
              {!user && (
                <>
                  <div className="tw-m-2">
                    <Button
                      onClick={async () => {
                        setIsHamburgerOpen(false);
                        await router.push('/signup');
                      }}
                      invertedStyle
                    >
                      {t('header.signup')}
                    </Button>
                  </div>
                  <div className="tw-m-2">
                    <Button
                      onClick={async () => {
                        setIsHamburgerOpen(false);
                        await router.push('/login');
                      }}
                    >
                      {t('header.login')}
                    </Button>
                  </div>
                </>
              )}
              <div className="tw-flex tw-items-center tw-justify-center">
                <div className="tw-m-2">
                  <Toggle isValue={isDarkMode} setValue={setIsDarkMode} onChange={() => setIsHamburgerOpen(false)} />
                </div>
                <div className="tw-m-2">
                  <Dropdown
                    value={router.locale?.toUpperCase()}
                    options={NEXT_I18NEXT_CONFIG.i18n.locales
                      .filter(val => val !== 'placeholder')
                      .map(local => local.toUpperCase())}
                    onChange={async val => {
                      setIsHamburgerOpen(false);
                      await router.replace(router.asPath, router.asPath, { locale: val.toLowerCase() });
                      setCookie('lang', val.toLowerCase(), { sameSite: 'lax', path: '/' });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {user && (
          <>
            <div
              className="tw-relative tw-m-2 tw-mr-4 tw-flex tw-h-14 tw-w-14 tw-items-center tw-justify-center"
              ref={profileRef}
            >
              <label className="tw-peer tw-flex tw-h-14 tw-w-14">
                <input
                  type="checkbox"
                  className="tw-hidden"
                  checked={isProfileOpen}
                  onChange={() => setIsProfileOpen(val => !val)}
                />
                {profilePicture ? (
                  <img
                    className="tw-m-0 tw-h-14 tw-w-14 tw-rounded-full tw-border-2 tw-border-solid tw-border-black dark:tw-border-white"
                    src={`data:image;base64,${profilePicture}`}
                    alt="Profile"
                    draggable="false"
                  />
                ) : (
                  <div className="tw-m-0 tw-aspect-square tw-h-14 tw-rounded-full tw-border-2 tw-border-solid tw-border-black tw-bg-gradient-to-br tw-from-lime-400 tw-to-sky-400 dark:tw-border-white" />
                )}
              </label>
              <div className="tw-absolute tw-right-0 tw-top-20 tw-z-50 tw-m-3 tw-flex tw-h-fit tw-max-h-0 tw-w-fit tw-justify-end tw-overflow-hidden tw-rounded-2xl tw-bg-black/20 tw-backdrop-blur-lg tw-transition-max-height tw-duration-500 peer-has-[input:checked]:tw-max-h-screen">
                <div className="tw-flex tw-flex-col tw-justify-end tw-px-10 tw-py-5">
                  <div className="tw-mb-2 tw-flex tw-flex-col tw-items-end *:tw-m-1 *:tw-text-xl *:tw-font-semibold *:tw-text-black *:tw-no-underline *:tw-decoration-2 *:tw-underline-offset-4 *:dark:tw-text-white">
                    <Link href="/chat" className="hover:tw-underline" onClick={() => setIsProfileOpen(false)}>
                      {t('header.chat')}
                    </Link>
                    <Link href="/profile" className="hover:tw-underline" onClick={() => setIsProfileOpen(false)}>
                      {t('header.profile')}
                    </Link>
                  </div>
                  <div className="tw-mr-[-8px]">
                    <Button
                      onClick={async () => {
                        setIsProfileOpen(false);
                        setUser(undefined);
                        deleteCookie('access_token', { path: '/' });
                        await router.push('/');
                      }}
                      invertedStyle
                    >
                      {t('header.logout')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
