import { FunctionComponent, useEffect, useState } from 'react';
import { NotificationTypesEnum } from '../../enums/notificationTypes.enum';
import { Notification } from '../../types/notification.types';

const NotificationComponent: FunctionComponent<Notification> = ({ message, type, id, removeNotification }) => {
  const [closing, setIsClosing] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(
      () => {
        console.log('closing now');
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
        console.log('removing notification');
        removeNotification(id);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [closing, id, removeNotification]);
  return (
    <div
      className={`tw-flex tw-w-full tw-items-center tw-justify-center tw-border tw-border-x-0 tw-border-t-0 tw-border-solid tw-border-gray-200 tw-transition-opacity tw-duration-500 dark:tw-border-gray-800 ${closing ? 'tw-opacity-0' : ''}`}
    >
      <p className={`${(type === NotificationTypesEnum.SUCCESS && 'tw-text-green-600') || (type === NotificationTypesEnum.FAILURE && 'tw-text-red-600')}`}>{message}</p>
    </div>
  );
};

export default NotificationComponent;
