import { ButtonHTMLAttributes, FunctionComponent, PropsWithChildren } from 'react';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  invertedStyle?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  invertedStyle,
  disabled,
  isLoading,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`inverted tw-flex tw-h-10 tw-w-fit tw-min-w-24 tw-items-center tw-justify-center tw-rounded-full tw-text-base tw-transition-colors tw-duration-200 disabled:tw-cursor-not-allowed disabled:tw-bg-gray-500 disabled:hover:tw-bg-gray-500 disabled:dark:tw-bg-gray-500 disabled:hover:dark:tw-bg-gray-500 ${invertedStyle ? 'tw-border tw-border-solid tw-border-black tw-bg-black tw-text-white hover:tw-bg-transparent hover:tw-text-black dark:tw-border-white dark:tw-bg-white dark:tw-text-black dark:hover:tw-text-white' : 'tw-border tw-border-solid tw-border-black tw-bg-transparent tw-text-black xl:hover:tw-bg-black xl:hover:tw-text-white dark:tw-border-white dark:tw-text-white dark:xl:hover:tw-bg-white dark:xl:hover:tw-text-black'}`}
      disabled={disabled || isLoading}
    >
      {isLoading && <LoadingSpinner size="4" invertedStyle={invertedStyle} />}
      {!isLoading && children}
    </button>
  );
};

export default Button;
