import Link from 'next/link';
import { FunctionComponent, SetStateAction, useState } from 'react';

interface HeaderHamburgerMenuProps {
  isOpen: boolean | undefined;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}

const HeaderHamburgerMenu: FunctionComponent<HeaderHamburgerMenuProps> = ({ isOpen, setIsOpen}) => {

  return (
      <div className='hover:tw-cursor-pointer tw-bg-transparent tw-border-none tw-flex tw-flex-col tw-justify-around tw-w-12 tw-h-12 tw-mx-5'>
        <input className='tw-absolute tw-top-5 tw-left-4 tw-opacity-0 tw-cursor-pointer tw-h-12 tw-w-12' type='checkbox' onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu" />
        <div className={`tw-bg-font-light dark:tw-bg-font-dark tw-w-full tw-h-[5px] tw-rounded-full ${isOpen ? 'tw-origin-top-left tw-rotate-45 tw-transition-transform tw-duration-500' : 'tw-origin-top-left tw-rotate-0 tw-transition-transform tw-duration-500 tw-transform-gpu'}`} />
        <div className={`tw-bg-font-light dark:tw-bg-font-dark tw-w-full tw-h-[5px] tw-rounded-full ${isOpen ? 'tw-opacity-0 tw-transition-opacity tw-duration-200' : 'tw-opacity-100 tw-transition-opacity tw-duration-200 tw-transform-gpu'}`} />
        <div className={`tw-bg-font-light dark:tw-bg-font-dark tw-w-full tw-h-[5px] tw-rounded-full ${isOpen ? 'tw-origin-bottom-left -tw-rotate-45 tw-transition-transform tw-duration-500' : 'tw-origin-bottom-left -tw-rotate-0 tw-transition-transform tw-duration-500 tw-transform-gpu'}`} />
      </div>
  );
};

export default HeaderHamburgerMenu;
