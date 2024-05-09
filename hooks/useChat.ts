import { useState } from 'react';
import { encrypt, extractKey } from '../helpers/key.helpers';
import { APIOperation } from '../services/api-services/common';
import { UserType } from '../types/user.type';
import useFetch from './useFetch';
import { ChatType } from '../types/chat.type';

const useChat = (): {
  createChat: (
    name: string,
    description: string | undefined,
    picture: string | undefined,
    users: { id: UserType['id']; publicKey: UserType['publicKey'] }[],
  ) => Promise<void>;
  getChatsPreview: () => Promise<void>;
  chatsPreview: Partial<ChatType>[];
  isLoading: boolean;
} => {
  const { fetchDataWithLoadingTimeout, isLoading } = useFetch();

  const [chatsPreview, setChatsPreview] = useState<Partial<ChatType>[]>([]);

  const createChat = async (
    name: string,
    description: string | undefined,
    picture: string | undefined,
    users: { id: UserType['id']; publicKey: UserType['publicKey'] }[],
  ): Promise<void> => {
    const rawChatKey = await window.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, [
      'encrypt',
      'decrypt',
    ]);
    console.log(rawChatKey);
    const chatKey = Buffer.from(await window.crypto.subtle.exportKey('raw', rawChatKey)).toString('base64');
    console.log(chatKey);
    const userKeys = await Promise.all(
      users.map(async user => {
        const pubKey = await window.crypto.subtle.importKey(
          'spki',
          Buffer.from(extractKey(user.publicKey), 'base64'),
          { name: 'RSA-OAEP', hash: { name: 'SHA-256' } },
          true,
          ['encrypt'],
        );
        const encryptedChatKey = await encrypt(chatKey, pubKey);
        return { key: encryptedChatKey, userId: user.id };
      }),
    );
    const res = await fetchDataWithLoadingTimeout({
      op: APIOperation.CREATE_CHAT,
      payload: {
        name,
        description,
        picture,
        users: users.map(user => {
          return user.id;
        }),
        userKeys,
      },
    });
    if (!res.success) {
      console.error(res.errorCode);
    } else {
      console.log(res.data);
    }
  };

  const getChatsPreview = async (): Promise<void> => {
    const res = await fetchDataWithLoadingTimeout({ op: APIOperation.GET_CHAT_PREVIEW });
    if (!res.success) {
      console.error(res.errorCode);
    } else {
      setChatsPreview(res.data);
    }
  };

  return { createChat, getChatsPreview, isLoading, chatsPreview };
};

export default useChat;
