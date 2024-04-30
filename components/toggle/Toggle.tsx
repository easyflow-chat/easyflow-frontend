import { FunctionComponent, InputHTMLAttributes, SetStateAction } from 'react';

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  isValue: boolean | undefined;
  setValue: (value: SetStateAction<boolean | undefined>) => void;
}

const Toggle: FunctionComponent<ToggleProps> = ({ isValue, setValue, ...props }): JSX.Element => {
  return (
    <label className="tw-my-auto tw-flex tw-h-[34px] tw-w-[60px] tw-items-center tw-rounded-full tw-bg-black xl:hover:tw-cursor-pointer dark:tw-bg-white">
      <input
        {...props}
        type="checkbox"
        className="tw-peer/toogle tw-hidden"
        onChange={() => setValue(val => !val)}
        checked={isValue || false}
      />
      <div
        className={`tw-mx-[5px] tw-h-[24px] tw-w-[24px] tw-rounded-full tw-bg-white tw-transition-transform tw-duration-700 peer-checked/toogle:tw-translate-x-[24px] dark:tw-bg-black`}
      />
    </label>
  );
};

export default Toggle;
