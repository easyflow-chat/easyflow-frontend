import Image from 'next/image';
import { FunctionComponent, HTMLInputTypeAttribute, InputHTMLAttributes, useState } from 'react';
import hide from '../../public/images/password-hide.svg';
import show from '../../public/images/password-show.svg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: HTMLInputTypeAttribute;
  errors?: string;
  required?: boolean;
}

const Input: FunctionComponent<InputProps> = ({ label, errors, required, type, ...props }) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <div className={`tw-group tw-my-5 ${errors ? 'errors' : ''}`}>
      {label && (
        <p className="tw-m-0 tw-mb-1 tw-text-sm tw-text-gray-800 group-[.errors]:tw-text-red-500 dark:tw-text-gray-400">
          {required && '*'}
          {label}
        </p>
      )}
      <div className="tw-relative">
        <input
          {...props}
          type={type === 'password' && showPass ? 'text' : type}
          className="tw-border-b-solid dark:focus:tw-border-b-whit tw-h-8 tw-w-96 tw-border-0 tw-border-b tw-bg-transparent tw-text-base tw-text-black tw-transition-colors tw-duration-200 focus:tw-border-b-black focus:tw-outline-none group-[.errors]:tw-text-red-500 dark:tw-border-b-gray-700 dark:tw-text-white"
          required={required}
        />
        {type === 'password' && (
          <Image
            src={showPass ? hide : show}
            alt="show/hide"
            className="tw-absolute tw-bottom-2 tw-right-1 tw-rounded-md xl:hover:tw-cursor-pointer dark:tw-invert"
            onClick={() => setShowPass(!showPass)}
            draggable="false"
          />
        )}
      </div>

      {errors && <p className="tw-m-0 tw-text-xs tw-text-red-500">{errors}</p>}
    </div>
  );
};

export default Input;
