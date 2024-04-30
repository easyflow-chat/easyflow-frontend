import { setCookie } from 'cookies-next';
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
  const { user, profilePicture } = useContext(GlobalContext);
  const router = useRouter();
  const { t } = useTranslation();
  const hamburgerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  useDetectOutsideClick(hamburgerRef, setIsOpen);

  return (
    <header className="tw-sticky tw-top-0 tw-z-50 tw-flex tw-h-20 tw-w-full tw-justify-center tw-shadow-sm tw-shadow-black/20 tw-backdrop-blur-3xl tw-backdrop-brightness-75">
      <div className="tw-flex tw-w-full tw-max-w-[2100px] tw-items-center tw-justify-between">
        <Link href="/" className="tw-mx-4">
          <Image src={logo} alt="Logo" className="tw-h-14 tw-w-14 dark:tw-invert" />
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
              checked={isOpen}
              onChange={() => setIsOpen(val => !val)}
            />
            <span className="tw-m-1 tw-h-1 tw-w-[34px] tw-origin-right tw-rounded-full tw-bg-black tw-transition-transform tw-duration-300 peer-checked/hamburger:tw--rotate-45 dark:tw-bg-white" />
            <span className="tw-m-1 tw-h-1 tw-w-[34px] tw-rounded-full tw-bg-black tw-transition-opacity tw-duration-300 peer-checked/hamburger:tw-opacity-0 dark:tw-bg-white" />
            <span className="tw-m-1 tw-h-1 tw-w-[34px] tw-origin-right tw-rounded-full tw-bg-black tw-transition-transform tw-duration-300 peer-checked/hamburger:tw-rotate-45 dark:tw-bg-white" />
          </label>
          <div className="tw-dark tw-absolute tw-right-0 tw-top-20 tw-flex tw-h-[calc(100vh-80px)] tw-w-0 tw-flex-col tw-items-center tw-overflow-hidden tw-bg-black/75 tw-text-white tw-backdrop-blur-xl tw-transition-width tw-duration-500 peer-has-[input:checked]/label:tw-w-screen ">
            <div className="tw-m-8">
              <div className="tw-m-2">
                <Button onClick={() => router.push('/signup')} invertedStyle>
                  {t('header.signup')}
                </Button>
              </div>
              <div className="tw-m-2">
                <Button onClick={() => router.push('/login')}>{t('header.login')}</Button>
              </div>
              <div className="tw-flex tw-items-center tw-justify-center">
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
              </div>
            </div>
          </div>
        </div>
        {user && (
          <div className="tw-m-2 tw-mr-4 tw-h-14 tw-w-14">
            {profilePicture ? (
              <img
                className="tw-h-full tw-w-full tw-rounded-full"
                src={`data:image;base64,${profilePicture}`}
                alt="Profile"
              />
            ) : (
              <div className="tw-h-full tw-w-full tw-rounded-full tw-bg-gradient-to-br tw-from-lime-400 tw-to-sky-400" />
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
