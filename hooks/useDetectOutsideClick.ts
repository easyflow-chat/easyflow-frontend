import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

// eslint-disable-next-line
const useDetectOutsideClick = (ref: RefObject<HTMLDivElement>, setState: Dispatch<SetStateAction<boolean>>): void => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      // kinda sucks with the type but seems to work
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setState(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setState]);
};

export default useDetectOutsideClick;
