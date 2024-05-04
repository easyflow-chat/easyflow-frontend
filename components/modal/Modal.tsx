// create a custom component that will be used as a modal and has a ref

import Image from 'next/image';
import { Children, ReactElement, ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import closeCross from '../../public/images/close-cross.svg';
import ModalContent from './ModalContent';
import ModalTrigger from './ModalTrigger';

interface ModalProps {
  title?: string;
  children: ReactNode;
}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

// eslint-disable-next-line
const Modal = forwardRef<ModalRef, ModalProps>(({ title, children }, ref) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.showModal(),
    close: () => modalRef.current?.close(),
  }));
  // eslint-disable-next-line
  const isReactElement = (arg: any): arg is ReactElement => {
    // eslint-disable-next-line
    return arg.hasOwnProperty('type');
  };

  const childrenArr = Children.toArray(children);
  const trigger = childrenArr.find(child => isReactElement(child) && child.type === ModalTrigger);
  const content = childrenArr.filter(child => isReactElement(child) && child.type === ModalContent);

  return (
    <>
      <div onClick={() => modalRef.current?.showModal()}>{trigger}</div>
      <dialog
        ref={modalRef}
        className="tw-z[1000] tw-fixed tw-h-fit tw-max-h-[calc(100vh-32px)] tw-min-h-32 tw-w-fit tw-min-w-64 tw-max-w-[1880px] tw-rounded-xl tw-border-none tw-bg-gradient-to-br tw-from-cyan-300/20 tw-via-purple-500/20 tw-to-blue-500/20 tw-py-10 backdrop:tw-backdrop-blur-lg dark:tw-bg-black dark:tw-text-white"
      >
        <Image
          ref={ref => {
            if (!ref) return;

            ref.onclick = () => modalRef.current?.close();
          }}
          src={closeCross}
          alt="close cross"
          className="tw-absolute tw-right-3 tw-top-3 hover:tw-cursor-pointer dark:tw-invert"
        />
        <h1 className="tw-left-8 tw-top-3 tw-m-0 tw-mb-3">{title}</h1>
        <div className="tw-h-full tw-max-h-[calc(100vh-200px)] tw-w-[100%-80px] tw-overflow-scroll tw-px-10">
          {content}
        </div>
      </dialog>
    </>
  );
});

export default Modal;
