import { MessageType } from './message.type';
import { UserType } from './user.type';

export type ChatType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description?: string;
  picture?: string;
  users: UserType[];
  messages: MessageType[];
  userKeys: { key: string; userId: string }[];
};

export type ChatPreviewType = Omit<ChatType, 'userKeys' | 'messages' | 'users'>;
