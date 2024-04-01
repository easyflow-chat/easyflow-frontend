import { FunctionComponent, SetStateAction } from 'react';

interface DarkModeToggleProps {
  isDarkMode: boolean | undefined;
  setIsDarkMode: (value: SetStateAction<boolean | undefined>) => void;
}

const DarkModeToggle: FunctionComponent<DarkModeToggleProps> = ({ isDarkMode, setIsDarkMode }): JSX.Element => {
  return (
    <label className="tw-mx-3 tw-my-auto tw-flex tw-h-[34px] tw-w-[60px] tw-items-center tw-rounded-full tw-bg-black hover:tw-cursor-pointer dark:tw-bg-white">
      <input type="checkbox" className="tw-hidden" onClick={() => setIsDarkMode(!isDarkMode)} />
      <div
        className={`tw-mx-[5px] tw-h-[24px] tw-w-[24px] tw-rounded-full tw-bg-white tw-transition-transform tw-duration-700 dark:tw-bg-black ${!isDarkMode && 'tw-translate-x-[24px]'}`}
      />
    </label>
  );
};

export default DarkModeToggle;
