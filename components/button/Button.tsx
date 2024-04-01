import { ButtonHTMLAttributes, FunctionComponent, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  invertedStyle?: boolean;
  disabled?: boolean;
}

const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({ invertedStyle, disabled, children, ...props }) => {
  return (
    <button
      {...props}
      className={`tw-m-3 tw-flex tw-h-10 tw-w-fit tw-min-w-24 tw-items-center tw-justify-center tw-rounded-full tw-text-base tw-transition-colors tw-duration-200 ${invertedStyle ? `tw tw-border tw-border-solid tw-border-black tw-bg-black tw-text-white hover:tw-bg-transparent hover:tw-text-black dark:tw-border-white dark:tw-bg-white dark:tw-text-black dark:hover:tw-bg-transparent dark:hover:tw-text-white ${disabled && 'tw-cursor-not-allowed tw-bg-gray-500 dark:tw-bg-gray-500 hover:tw-bg-gray-500 dark:hover:tw-bg-gray-500 hover:tw-text-white dark:hover:tw-text-black'}` : `tw-border tw-border-solid tw-border-black tw-bg-transparent tw-text-black hover:tw-bg-black hover:tw-text-white dark:tw-border-white dark:tw-text-white dark:hover:tw-bg-white dark:hover:tw-text-black ${disabled && 'tw-cursor-not-allowed tw-bg-gray-500 dark:tw-bg-gray-500 hover:tw-bg-gray-500 dark:hover:tw-bg-gray-500 hover:tw-text-black dark:hover:tw-text-white'}`}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
