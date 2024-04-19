import { useRouter } from 'next/router';
import { Dispatch, FunctionComponent, SetStateAction, useContext } from 'react';
import NEXT_I18NEXT_CONFIG from '../../config/i18n.config';
import { UserContext } from '../../context/user.context';
import Button from '../button/Button';
import Toggle from '../toggle/Toggle';
import Dropdown from '../dropdown/Dropdown';

interface HeaderProps {
  isDarkMode: boolean | undefined;
  setIsDarkMode: Dispatch<SetStateAction<boolean | undefined>>;
}

const Header: FunctionComponent<HeaderProps> = ({ isDarkMode, setIsDarkMode }): JSX.Element => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  return (
    <header className="tw-sticky tw-top-0 tw-flex tw-h-20 tw-w-full tw-items-center tw-justify-between tw-border tw-border-x-0 tw-border-t-0 tw-border-solid tw-border-gray-200 tw-bg-white/[0.5] tw-backdrop-blur-xl dark:tw-border-gray-800 dark:tw-bg-black/[0.5]">
      <img src="/images/logo.png" alt="logo" className="tw-m-4" />
      <div className="tw-flex tw-items-center">
        <Toggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Dropdown
          value={router.locale?.toUpperCase()}
          options={NEXT_I18NEXT_CONFIG.i18n.locales
            .filter(val => val !== 'placeholder')
            .map(local => local.toUpperCase())}
          onChange={val => router.replace(router.asPath, router.asPath, { locale: val.toLowerCase() })}
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
    </header>
  );
};

export default Header;
