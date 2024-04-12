import { FunctionComponent, HTMLInputTypeAttribute, InputHTMLAttributes, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: HTMLInputTypeAttribute;
  errors?: string;
  required?: boolean;
}

const Input: FunctionComponent<InputProps> = ({ label, errors, required, type, ...props }) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <div className="tw-my-5">
      <p className={`tw-m-0 tw-mb-1 tw-text-sm tw-text-gray-400 ${errors && 'tw-text-red-500'}`}>
        {required && '*'}
        {label}
      </p>
      <div className="tw-relative">
        <input
          {...props}
          type={type === 'password' && showPass ? 'text' : type}
          className={`tw-border-b-solid tw-h-8 tw-w-96 tw-border-0 tw-border-b tw-bg-transparent tw-text-base tw-text-black tw-transition-colors tw-duration-200 focus:tw-border-b-black focus:tw-outline-none dark:tw-border-b-gray-700 dark:tw-text-white dark:focus:tw-border-b-white ${errors && 'tw-text-red-500'}`}
          required={required}
        />
        {type === 'password' && (
          <img
            src={`/images/password-${showPass ? 'hide' : 'show'}.svg`}
            alt="show/hide"
            className="tw-absolute tw-bottom-2.5 tw-right-1 tw-rounded-md xl:hover:tw-cursor-pointer dark:tw-invert"
            onClick={() => setShowPass(!showPass)}
          />
        )}
      </div>

      {errors && <p className="tw-m-0 tw-text-xs tw-text-red-500">{errors}</p>}
    </div>
  );
};

export default Input;
