import Image from 'next/image';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import downArrow from '../../public/images/down-arrow.svg';

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
    }
    setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className={`tw-group/dropdown tw-relative ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <div
        className="tw-flex tw-items-center tw-rounded-md tw-p-1 tw-font-bold hover:tw-cursor-pointer hover:tw-bg-black/10 dark:hover:tw-bg-white/10"
        onClick={() => setIsOpen(val => !val)}
      >
        {selected}
        <Image
          src={downArrow}
          alt="Down arrow"
          className="tw-m-1 tw-h-4 tw-w-4 tw-origin-center tw-transition-transform tw-duration-300 group-[.open]/dropdown:tw-rotate-180 dark:tw-invert"
          draggable="false"
        />
      </div>
      <div className="tw-absolute tw-max-h-0 tw-overflow-hidden tw-transition-max-height tw-duration-300 group-[.open]/dropdown:tw-max-h-96">
        {options
          .filter(val => val !== selected)
          .map(option => (
            <div
              key={option}
              onClick={() => setSelected(option)}
              className="tw-flex tw-cursor-pointer tw-rounded-md tw-p-2 tw-text-black hover:tw-bg-black/10 hover:tw-text-gray-800 dark:tw-text-white dark:hover:tw-bg-white/10 dark:hover:tw-text-gray-300"
            >
              {option}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
