import { ButtonHTMLAttributes, FunctionComponent, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  invertedStyle?: boolean;
  disabled?: boolean;
}

const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({ invertedStyle, disabled, children, ...props }) => {
  return (
    <button
      {...props}
      className={`tw-m-3 tw-flex tw-h-10 tw-w-fit tw-min-w-24 tw-items-center tw-justify-center tw-rounded-full tw-text-base tw-transition-colors tw-duration-200 ${invertedStyle ? `tw tw-border tw-border-solid tw-border-black tw-bg-black tw-text-white xl:hover:tw-bg-transparent xl:hover:tw-text-black dark:tw-border-white dark:tw-bg-white dark:tw-text-black dark:xl:hover:tw-bg-transparent dark:xl:hover:tw-text-white ${disabled && 'tw-cursor-not-allowed tw-bg-gray-500 xl:hover:tw-bg-gray-500 xl:hover:tw-text-white dark:tw-bg-gray-500 dark:xl:hover:tw-bg-gray-500 dark:xl:hover:tw-text-black'}` : `tw-border tw-border-solid tw-border-black tw-bg-transparent tw-text-black xl:hover:tw-bg-black xl:hover:tw-text-white dark:tw-border-white dark:tw-text-white dark:xl:hover:tw-bg-white dark:xl:hover:tw-text-black ${disabled && 'tw-cursor-not-allowed tw-bg-gray-500 xl:hover:tw-bg-gray-500 xl:hover:tw-text-black dark:tw-bg-gray-500 dark:xl:hover:tw-bg-gray-500 dark:xl:hover:tw-text-white'}`}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
