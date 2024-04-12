import { FunctionComponent, useEffect, useState } from 'react';
import { NotificationTypesEnum } from '../../enums/notificationTypes.enum';
import { Notification } from '../../types/notification.types';

const NotificationComponent: FunctionComponent<Notification> = ({ message, type, id, removeNotification }) => {
  const [closing, setIsClosing] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsClosing(true);
      },
      type === NotificationTypesEnum.SUCCESS ? 3000 : 5000,
    );

    return () => {
      clearTimeout(timer);
    };
  }, [type]);

  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => {
        removeNotification(id);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [closing, id, removeNotification]);
  return (
    <div className="tw-relative tw-mt-2">
      <div
        className={`tw-justify-left tw-flex tw-h-fit tw-min-h-24 tw-w-80 tw-items-center tw-rounded-md tw-border tw-border-l-4 tw-border-solid tw-border-gray-200 tw-backdrop-blur-md dark:tw-border-gray-800 ${(type === NotificationTypesEnum.SUCCESS && 'tw-border-l-green-600 dark:tw-border-l-green-600') || (type === NotificationTypesEnum.FAILURE && 'tw-border-l-red-600 dark:tw-border-l-red-600') || 'tw-border-l-gray-600 dark:tw-border-l-gray-600'} tw-transition-opacity tw-duration-500 ${closing ? 'tw-opacity-0' : ''}`}
      >
        <p
          className={`tw-mx-2 ${(type === NotificationTypesEnum.SUCCESS && 'tw-text-green-600') || (type === NotificationTypesEnum.FAILURE && 'tw-text-red-600')}`}
        >
          {message}
        </p>
        <img
          className="tw-absolute tw-right-2 tw-top-2 tw-h-3 tw-w-3 xl:hover:tw-cursor-pointer dark:tw-invert"
          alt="closing cross"
          src="/images/close-cross.svg"
          onClick={() => {
            setIsClosing(true);
          }}
        />
      </div>
    </div>
  );
};

export default NotificationComponent;
