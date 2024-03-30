import { FunctionComponent, SetStateAction } from 'react';

interface DarkModeToggleProps {
    setIsDarkMode: (value: SetStateAction<boolean | undefined>) => void;
}

const DarkModeToggle: FunctionComponent<DarkModeToggleProps> = ({ setIsDarkMode }): JSX.Element => {
    return (
        <div className='dark:tw-bg-background-dark-2 tw-w-[60px] tw-h-[34px] tw-rounded-full'>
            <div className='dark:tw-bg-toggle tw-rounded-full tw-w-[30px] tw-h-[30px]' />
        </div>
    );
};

export default DarkModeToggle;
