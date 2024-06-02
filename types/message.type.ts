import { UserType } from './user.type';

export type MessageType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sender: { id: UserType['id']; name: UserType['name'] };
  content: string;
  iv: string;
};
