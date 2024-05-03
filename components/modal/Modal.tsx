import Image from 'next/image';
import { Children, FunctionComponent, PropsWithChildren, ReactNode, RefObject, createRef } from 'react';
import closeCross from '../../public/images/close-cross.svg';
import ModalContent from './ModalContent';
import ModalTrigger from './ModalTrigger';

interface DialogProps {
  ref?: RefObject<HTMLDialogElement>;
  children?: ReactNode;
}

const Modal: FunctionComponent<PropsWithChildren<DialogProps>> = ({
  ref = createRef<HTMLDialogElement>(),
  children,
}) => {
  // eslint-disable-next-line
  const isReactElement = (arg: any): arg is React.ReactElement => {
    // eslint-disable-next-line
    return arg.hasOwnProperty('type');
  };

  const childrenArr = Children.toArray(children);
  const trigger = childrenArr.find(child => isReactElement(child) && child.type === ModalTrigger);
  const content = childrenArr.filter(child => isReactElement(child) && child.type === ModalContent);

  return (
    <>
      <div onClick={() => ref.current?.showModal()}>{trigger}</div>
      <dialog
        open={false}
        ref={ref}
        className="dark:tw-backdrop tw-fixed tw-inset-0 tw-z-[1000] tw-m-auto tw-flex tw-h-screen tw-w-screen tw-items-center tw-justify-center tw-border-none tw-bg-transparent tw-p-0 tw-backdrop-blur-lg tw-backdrop-brightness-50"
      >
        <div className="tw-relative tw-h-fit tw-max-h-[1000px] tw-min-h-32 tw-w-fit tw-min-w-64 tw-max-w-[1800px] tw-rounded-xl tw-bg-gray-100 tw-p-5 tw-text-black dark:tw-bg-[#080808] dark:tw-text-white">
          <form method="dialog" className="tw-absolute tw-right-2 tw-top-2">
            <button>
              <Image
                src={closeCross}
                alt="Close cross"
                className="tw-h-5 tw-w-5 hover:tw-cursor-pointer dark:tw-invert"
              />
            </button>
          </form>

          {content}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
