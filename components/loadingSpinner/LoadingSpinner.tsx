import { FunctionComponent } from 'react';

interface LoadingSpinnerProps {
  size: string;
  invertedStyle?: boolean;
}

const LoadingSpinner: FunctionComponent<LoadingSpinnerProps> = ({ size, invertedStyle }) => {
  return (
    <svg className={`tw-h-${size} tw-w-${size} tw-animate-spin`} viewBox="0 0 50 50">
      <circle
        className={`tw-animate-dash ${invertedStyle ? 'tw-stroke-white dark:tw-stroke-black' : 'tw-stroke-black dark:tw-stroke-white'}`}
        strokeLinecap="round"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  );
};

export default LoadingSpinner;
