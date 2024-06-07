import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { GlobalContext } from '../context/gloabl.context';
import { APIOperation } from '../services/api-services/common';
import { ChatPreviewType, ChatType } from '../types/chat.type';
import { UserType } from '../types/user.type';
import useFetch from './useFetch';

const useChat = (): {
  createChat: (
    name: string,
    description: string | undefined,
    picture: string | undefined,
    users: { id: UserType['id']; publicKey: UserType['publicKey'] }[],
  ) => Promise<void>;
  getChatsPreview: () => Promise<void>;
  getChatById: (chatId: string, privateKey: CryptoKey) => Promise<void>;
  sendMessage: (content: string, chatId: string, iv: Uint8Array) => Promise<void>;
  chat: ChatType | undefined;
  chatKey: CryptoKey | undefined;
  chatsPreviews: ChatPreviewType[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setChat: Dispatch<SetStateAction<ChatType | undefined>>;
} => {
  const { user, webSocket } = useContext(GlobalContext);
  const { fetchDataWithLoadingTimeout, isLoading, setIsLoading } = useFetch();

  const [chatsPreviews, setChatsPreviews] = useState<ChatPreviewType[]>([]);
  const [chat, setChat] = useState<ChatType>();
  const [chatKey, setChatKey] = useState<CryptoKey>();

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
    const userKeys = await Promise.all(
      users.map(async user => {
        const pubKey = await window.crypto.subtle.importKey(
          'spki',
          Buffer.from(user.publicKey, 'base64'),
          { name: 'RSA-OAEP', hash: 'SHA-256' },
          false,
          ['wrapKey'],
        );
        const encryptedChatKey = Buffer.from(
          await window.crypto.subtle.wrapKey('raw', rawChatKey, pubKey, { name: 'RSA-OAEP' }),
        ).toString('base64');
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
      const preview: ChatPreviewType = {
        id: res.data.id,
        createdAt: res.data.createdAt,
        updatedAt: res.data.updatedAt,
        name: res.data.name,
        description: res.data.description,
        picture: res.data.picture,
      };

      setChatsPreviews([...chatsPreviews, preview]);
    }
  };

  const getChatsPreview = async (): Promise<void> => {
    const res = await fetchDataWithLoadingTimeout({ op: APIOperation.GET_CHAT_PREVIEW });
    if (!res.success) {
      console.error(res.errorCode);
    } else {
      setChatsPreviews(res.data);
    }
  };

  const getChatById = async (chatId: string, privateKey: CryptoKey): Promise<void> => {
    const res = await fetchDataWithLoadingTimeout({ op: APIOperation.GET_CHAT, params: { id: chatId } });
    if (!res.success) {
      console.error(res.errorCode);
    } else {
      setIsLoading(true);
      const unwrapedChatKey = await window.crypto.subtle.unwrapKey(
        'raw',
        Buffer.from(res.data.userKeys[0].key, 'base64'),
        privateKey,
        { name: 'RSA-OAEP' },
        { name: 'AES-GCM', length: 512 },
        true,
        ['encrypt', 'decrypt'],
      );
      setChatKey(unwrapedChatKey);
      setChat(res.data);
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string, chatId: string, iv: Uint8Array): Promise<void> => {
    const req = {
      userId: user?.id,
      content,
      chatId,
      iv: Buffer.from(iv).toString('base64'),
    };
    webSocket?.emit('send_message', req);
  };

  return {
    createChat,
    getChatsPreview,
    getChatById,
    sendMessage,
    chat,
    chatKey,
    isLoading,
    setIsLoading,
    chatsPreviews,
    setChat,
  };
};

export default useChat;
