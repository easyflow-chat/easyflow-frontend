import { FunctionComponent, TextareaHTMLAttributes, useEffect, useState } from 'react';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errors?: string;
  maxLength?: number;
  required?: boolean;
}

const Textarea: FunctionComponent<InputProps> = ({ label, errors, required, maxLength, ...props }) => {
  const [textLength, setTextLength] = useState<number>(0);

  useEffect(() => {
    if (props.value) {
      setTextLength(props.value.toString().length);
    }
  }, [props]);

  return (
    <div className={`tw-group tw-my-5 ${errors ? 'errors' : ''} tw-w-full`}>
      <div className="tw-flex tw-justify-between">
        {label && (
          <label className="tw-m-0 tw-mb-1 tw-text-sm tw-text-gray-800 group-[.errors]:tw-text-red-500 dark:tw-text-gray-400">
            {required && '*'}
            {label}
          </label>
        )}
        {maxLength && (
          <p className="tw-m-0 tw-text-right tw-text-sm tw-text-gray-400">
            {textLength}/{maxLength}
          </p>
        )}
      </div>
      <textarea
        {...props}
        maxLength={maxLength}
        className="tw-h-8 tw-w-full tw-resize-none tw-rounded-md tw-border-solid tw-bg-transparent tw-text-base tw-text-black tw-backdrop-brightness-90 tw-transition-all tw-duration-200 focus:tw-h-48 focus:tw-border-black focus:tw-outline-none group-[.errors]:tw-border-red-500 group-[.errors]:tw-text-red-500 dark:tw-border-gray-700 dark:tw-text-white dark:focus:tw-border-white"
        required={required}
      />

      {errors && <p className="tw-m-0 tw-text-xs tw-text-red-500">{errors}</p>}
    </div>
  );
};

export default Textarea;
