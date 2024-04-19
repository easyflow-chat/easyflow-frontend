import { FunctionComponent, useEffect, useRef, useState } from 'react';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';

interface DropdownProps {
  value?: string;
  options: string[];
  onChange?: (val: string) => void;
}

const Dropdown: FunctionComponent<DropdownProps> = ({ value, options, onChange }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string>(value || options[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useDetectOutsideClick(dropdownRef, setIsOpen);
  useEffect(() => {
    if (onChange) {
      onChange(selected);
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className="tw-relative" ref={dropdownRef}>
      <div className="tw-flex tw-items-center tw-font-bold" onClick={() => setIsOpen(val => !val)}>
        {selected}
        <img
          src="/images/down-arrow.svg"
          alt="Down arrow"
          className={`tw-m-1 tw-h-4 tw-w-4 tw-transition-transform tw-duration-300 dark:tw-invert ${isOpen ? 'tw-origin-center tw-rotate-180 tw-transform-gpu' : ''}`}
        />
      </div>
      <div
        className={`tw-absolute tw-overflow-hidden tw-transition-max-height tw-duration-300 ${isOpen ? 'tw-max-h-96' : 'tw-max-h-0'}`}
      >
        {options
          .filter(val => val !== selected)
          .map(option => (
            <div
              key={option}
              onClick={() => setSelected(option)}
              className="tw-flex tw-cursor-pointer tw-bg-white tw-p-2 tw-text-black hover:tw-text-gray-800 dark:tw-bg-black dark:tw-text-white dark:hover:tw-text-gray-300"
            >
              {option}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
