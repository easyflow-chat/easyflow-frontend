import { Dispatch } from 'react';
import { NotificationTypesEnum } from '../enums/notificationTypes.enum';

export type Notification = {
  message: string;
  type: NotificationTypesEnum;
  id: number;
  removeNotification: Dispatch<Notification['id']>;
};
