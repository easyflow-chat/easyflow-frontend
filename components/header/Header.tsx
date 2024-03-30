import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, SetStateAction } from 'react';
import DarkModeToggle from '../darkModeToggle/DarkModeToggle';

interface HeaderProps {
  setIsDarkMode: (value: SetStateAction<boolean | undefined>) => void;
}

const Header: FunctionComponent<HeaderProps> = ({ setIsDarkMode }): JSX.Element => {
  const router = useRouter();

  return (
      <header className="tw-flex tw-justify-center tw-items-center tw-sticky tw-h-24 tw-bg-white dark:tw-bg-black tw-top-0 tw-backdrop-blur-xl tw-w-full tw-border-solid tw-border-b tw-border-t-0 tw-border-x-0 tw-border-border">
        <Link href="/" className="tw-no-underline tw-text-font-light dark:tw-text-font-dark">
          <h1>Website</h1>
        </Link>
        <DarkModeToggle setIsDarkMode={setIsDarkMode} />
      </header>
  );
};

export default Header;
