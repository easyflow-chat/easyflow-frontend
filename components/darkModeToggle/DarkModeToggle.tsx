import { FunctionComponent, SetStateAction } from 'react';

interface DarkModeToggleProps {
    isDarkMode: boolean | undefined;
    setIsDarkMode: (value: SetStateAction<boolean | undefined>) => void;
}

const DarkModeToggle: FunctionComponent<DarkModeToggleProps> = ({ isDarkMode, setIsDarkMode }): JSX.Element => {
  return (
    <label className="tw-flex tw-items-center tw-bg-background-light-2 dark:tw-bg-background-dark-2 tw-w-[60px] tw-h-[34px] tw-rounded-full hover:tw-cursor-pointer tw-my-auto tw-mx-3">
      <input type="checkbox" className="tw-hidden" onClick={() => setIsDarkMode(value => !value)} />
      <div className={`tw-bg-toggle-light dark:tw-bg-toggle-dark tw-w-[24px] tw-h-[24px] tw-rounded-full tw-mx-[5px] ${!isDarkMode && 'tw-animate-toggle'}`} />
    </label>
  );
};

export default DarkModeToggle;
