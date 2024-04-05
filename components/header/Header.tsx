import Link from 'next/link';
import { Dispatch, FunctionComponent, SetStateAction, useContext } from 'react';
import { UserContext } from '../../context/user.context';
import Button from '../Button/Button';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

interface HeaderProps {
  isDarkMode: boolean | undefined;
  setIsDarkMode: Dispatch<SetStateAction<boolean | undefined>>;
}

const Header: FunctionComponent<HeaderProps> = ({ isDarkMode, setIsDarkMode }): JSX.Element => {
  const { user } = useContext(UserContext);
  return (
    <header className="tw-sticky tw-top-0 tw-flex tw-h-24 tw-w-full tw-items-center tw-justify-between tw-border tw-border-x-0 tw-border-t-0 tw-border-solid tw-border-gray-200 tw-bg-white/[0.75] tw-backdrop-blur-xl dark:tw-border-gray-800 dark:tw-bg-black/[0.75]">
      <img src="/images/logo.png" alt="logo" className="tw-m-4" />
      <div className="tw-flex">
        <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        {!user && (
          <>
            <Link href={'/signup'} className="tw-no-underline">
              <Button invertedStyle={true}>Signup</Button>
            </Link>
            <Link href={'/login'} className="tw-no-underline">
              <Button>Login</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
