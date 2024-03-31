import Link from 'next/link';
import { FunctionComponent, SetStateAction, useState } from 'react';
import HeaderHamburgerMenu from './HeaderHamburgerMenu';

interface HeaderProps {
  isDarkMode: boolean | undefined;
  setIsDarkMode: (value: SetStateAction<boolean | undefined>) => void;
}

const Header: FunctionComponent<HeaderProps> = ({ isDarkMode, setIsDarkMode }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`tw-sticky tw-top-0`}>
      <div className='tw-relative'>
        <header className="tw-flex tw-h-24 tw-justify-between tw-items-center tw-backdrop-blur-xl tw-w-full tw-bg-background-light/[0.75] dark:tw-bg-black/[0.75] tw-border-solid tw-border-b tw-border-t-0 tw-border-x-0 tw-border-border">
          <HeaderHamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          <Link href="/" className="tw-no-underline tw-text-font-light dark:tw-text-font-dark">
            <h1>Website</h1>
          </Link>
        </header>
        <div
          className={`tw-absolute tw-w-full tw-flex tw-items-center tw-flex-col tw-overflow-hidden tw-backdrop-blur-xl tw-bg-background-light/[0.75] dark:tw-bg-black/[0.75] ${isOpen ? 'tw-origin-top tw-scale-y-100 tw-transition-transform tw-duration-500 tw-transform-gpu' : 'tw-origin-top tw-scale-y-0 tw-transition-transform tw-duration-500 tw-transform-gpu'}`}
        >
          <Link href="/settings" className="tw-no-underline tw-text-font-light dark:tw-text-font-dark">
            <h2>Settings</h2>
          </Link>
          <Link href="/settings" className="tw-no-underline tw-text-font-light dark:tw-text-font-dark">
            <h2>Settings</h2>
          </Link>
          <Link href="/settings" className="tw-no-underline tw-text-font-light dark:tw-text-font-dark">
            <h2>Settings</h2>
          </Link>
          <Link href="/settings" className="tw-no-underline tw-text-font-light dark:tw-text-font-dark">
            <h2>Settings</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
