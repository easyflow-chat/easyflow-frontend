import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';
import { emitUnboundError } from '../../context/context.utils';
import { NotificationTypesEnum } from '../../enums/notificationTypes.enum';
import { Notification } from '../../types/notification.types';
import NotificationComponent from './NotificationComponent';

interface NotificationContextProps {
  notifications: Omit<Notification, 'removeNotification'>[];
  setNotifications: Dispatch<SetStateAction<Omit<Notification, 'removeNotification'>[]>>;
  addFailureNotification: Dispatch<Notification['message']>;
  addSuccessNotification: Dispatch<Notification['message']>;
  addMessageNotifcation: Dispatch<Notification['message']>;
}

const NotificationcContext = createContext<NotificationContextProps>({
  setNotifications: emitUnboundError,
  notifications: [],
  addFailureNotification: () => {
    return;
  },
  addSuccessNotification: () => {
    return;
  },
  addMessageNotifcation: () => {
    return;
  },
});

const useNotifications = (): NotificationContextProps => {
  return useContext(NotificationcContext);
};

const NotificationsProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [notifications, setNotifications] = useState<Omit<Notification, 'removeNotification'>[]>([]);

  const addFailureNotification = (message: string): void => {
    setNotifications(n => [...n, { message, type: NotificationTypesEnum.FAILURE, id: new Date().getTime() }]);
  };

  const addSuccessNotification = (message: string): void => {
    setNotifications(n => [...n, { message, type: NotificationTypesEnum.SUCCESS, id: new Date().getTime() }]);
  };

  const addMessageNotifcation = (message: string): void => {
    setNotifications(n => [...n, { message, type: NotificationTypesEnum.MESSAGE, id: new Date().getTime() }]);
  };

  const removeNotification = (id: number): void => {
    setNotifications(n => n.filter(notification => notification.id !== id));
  };

  return (
    <NotificationcContext.Provider value={{ setNotifications, notifications, addFailureNotification, addSuccessNotification, addMessageNotifcation }}>
      <div className="tw-relative">
        <div className="tw-absolute tw-top-0 tw-w-full tw-backdrop-blur-md">
          {notifications.map(notifcation => (
            <NotificationComponent key={notifcation.id} message={notifcation.message} type={notifcation.type} id={notifcation.id} removeNotification={removeNotification} />
          ))}
        </div>
        {children}
      </div>
    </NotificationcContext.Provider>
  );
};

export default NotificationsProvider;
export { useNotifications };
