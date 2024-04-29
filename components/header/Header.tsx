import { setCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, FunctionComponent, SetStateAction, useContext, useRef, useState } from 'react';
import NEXT_I18NEXT_CONFIG from '../../config/i18n.config';
import { GlobalContext } from '../../context/gloabl.context';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import downArrow from '../../public/images/down-arrow.svg';
import Button from '../button/Button';
import Dropdown from '../dropdown/Dropdown';
import Toggle from '../toggle/Toggle';

interface HeaderProps {
  destinationsWithUser: string[];
  destinationsWithoutUser: string[];
  isDarkMode: boolean | undefined;
  setIsDarkMode: Dispatch<SetStateAction<boolean | undefined>>;
}

const Header: FunctionComponent<HeaderProps> = ({
  isDarkMode,
  setIsDarkMode,
  destinationsWithUser,
  destinationsWithoutUser,
}): JSX.Element => {
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useDetectOutsideClick(hamburgerRef, setIsOpen);
  const { user, profilePicture } = useContext(GlobalContext);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <header className="tw-sticky tw-top-0 tw-z-50 tw-flex tw-h-20 tw-w-full tw-justify-center tw-border tw-border-x-0 tw-border-t-0 tw-border-solid tw-border-gray-200 tw-bg-white/20 dark:tw-border-gray-800 dark:tw-bg-black/20">
      <div className="tw-flex tw-w-full tw-max-w-[2100px] tw-items-center tw-justify-between">
        <p className="tw-ml-4 tw-mr-32">logo here</p>
        <div className="tw-flex tw-w-full tw-items-center tw-justify-end">
          <div className="tw-hidden tw-w-full tw-items-center tw-justify-between xl:tw-flex">
            <div className="tw-flex tw-w-full tw-items-center">
              {user
                ? destinationsWithUser.map(destination => (
                    <Link
                      className={`tw-m-3 tw-rounded-none tw-text-2xl tw-font-bold tw-text-black tw-decoration-2 tw-underline-offset-2 hover:tw-underline dark:tw-text-white ${router.pathname.includes(destination.split('/')[1]) ? 'tw-underline' : 'tw-no-underline'}`}
                      href={destination}
                      key={destination}
                    >
                      {t(`header.${destination.split('/')[1]}`)}
                    </Link>
                  ))
                : destinationsWithoutUser.map(destination => (
                    <Link
                      className={`tw-m-3 tw-rounded-none tw-text-2xl tw-font-bold tw-text-black tw-decoration-2 tw-underline-offset-2 hover:tw-underline dark:tw-text-white ${router.pathname.includes(destination.split('/')[1]) ? 'tw-underline' : 'tw-no-underline'}`}
                      href={destination}
                      key={destination}
                    >
                      {t(`header.${destination.split('/')[1]}`)}
                    </Link>
                  ))}
            </div>
            <div className="tw-flex">
              <div className="tw-flex tw-items-center">
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
              </div>
              {!user && (
                <>
                  <div className="tw-m-2">
                    <Button onClick={() => router.push('/signup')} invertedStyle={true}>
                      {t('header.signup')}
                    </Button>
                  </div>
                  <div className="tw-m-2">
                    <Button onClick={() => router.push('/login')}>{t('header.login')}</Button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="xl:tw-hidden" ref={hamburgerRef}>
            <label className="tw-peer/hamburger-label tw-m-2 tw-flex tw-flex-col">
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
            <div className="tw-absolute tw-right-0 tw-top-20 tw-h-[calc(100vh-80px)] tw-w-0 tw-overflow-hidden tw-pb-5 tw-backdrop-blur-md tw-transition-width tw-duration-300 peer-has-[input:checked]/hamburger-label:tw-w-[calc(100vw)]">
              <div className="tw-flex tw-flex-col tw-items-center tw-p-4">
                <div className="tw-mb-2">
                  {user
                    ? destinationsWithUser.map(destination => (
                        <div
                          className={`tw-group tw-flex tw-items-center tw-justify-center ${router.pathname.includes(destination.split('/')[1]) ? 'active' : ''}`}
                          onClick={async () => {
                            setIsOpen(false);
                            await router.push(destination);
                          }}
                          key={destination}
                        >
                          <p className="tw-my-3 tw-text-2xl tw-font-bold tw-text-inherit tw-decoration-2 group-hover:tw-underline group-[.active]:tw-underline">
                            {t(`header.${destination.split('/')[1]}`)}
                          </p>
                          <Image
                            src={downArrow}
                            alt="Down arrow"
                            className="tw-ml-2 tw-h-4 tw-w-4 tw-origin-center tw-rotate-[270deg] tw-transition-transform tw-duration-300 group-hover:tw-translate-x-1 dark:tw-invert"
                          />
                        </div>
                      ))
                    : destinationsWithoutUser.map(destination => (
                        <div
                          className={`tw-group tw-flex tw-items-center tw-justify-center ${router.pathname.includes(destination.split('/')[1]) ? 'active' : ''}`}
                          onClick={async () => {
                            setIsOpen(false);
                            await router.push(destination);
                          }}
                          key={destination}
                        >
                          <p className="tw-my-3 tw-text-2xl tw-font-bold tw-text-inherit tw-decoration-2 group-hover:tw-underline group-[.active]:tw-underline">
                            {t(`header.${destination.split('/')[1]}`)}
                          </p>
                          <Image
                            src={downArrow}
                            alt="Down arrow"
                            className="tw-ml-2 tw-h-4 tw-w-4 tw-origin-center tw-rotate-[270deg] tw-transition-transform tw-duration-300 group-hover:tw-translate-x-1 dark:tw-invert"
                          />
                        </div>
                      ))}
                </div>
                <div className="tw-flex tw-items-center">
                  <Toggle
                    isValue={isDarkMode}
                    setValue={setIsDarkMode}
                    onChange={() => {
                      window.localStorage.setItem('darkMode', (!!isDarkMode).toString());
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
          {user && (
            <div className="tw-m-4 tw-h-14 tw-w-14">
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
      </div>
    </header>
  );
};

export default Header;
