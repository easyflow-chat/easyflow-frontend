import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FunctionComponent, useEffect, useState } from 'react';
import ChatList from '../components/chat/ChatList';
import NEXT_I18NEXT_CONFIG from '../config/i18n.config';
import { I18nNamespace } from '../enums/i18n.enum';
import useChat from '../hooks/useChat';
import useKeys from '../hooks/useKeys';
import { APIOperation } from '../services/api-services/common';
import { serverSideRequest } from '../services/api-services/server-side';
import { UserType } from '../types/user.type';

interface ChatType {
  user: UserType;
}

const Chat: FunctionComponent<ChatType> = ({ user }): JSX.Element => {
  const { getKeys } = useKeys();
  const { getChatsPreview, chatsPreview } = useChat();

  //eslint-disable-next-line
  const [privateKey, setPrivateKey] = useState<CryptoKey>();
  //eslint-disable-next-line
  const [publicKey, setPublicKey] = useState<CryptoKey>();

  useEffect(() => {
    const keys = async (): Promise<void> => {
      const { privateKey, publicKey } = await getKeys();
      setPrivateKey(privateKey);
      setPublicKey(publicKey);
    };
    void keys();
    void getChatsPreview();
  }, []);

  return (
    <div className="tw-h-[calc(100vh-113px)] tw-w-full tw-rounded-xl tw-shadow-lg tw-shadow-black/20 tw-backdrop-brightness-75">
      <ChatList chats={chatsPreview} user={user} />
    </div>
  );
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const translations = await serverSideTranslations(
    ctx.locale ?? NEXT_I18NEXT_CONFIG.i18n.defaultLocale,
    [I18nNamespace.COMMON],
    NEXT_I18NEXT_CONFIG,
  );
  try {
    const res = await serverSideRequest<APIOperation.GET_USER>(ctx.req, { op: APIOperation.GET_USER });
    if (!res.data) {
      throw Error('Unauthorized');
    } else {
      return { props: { user: res.data, ...translations } };
    }
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: '/unauthorized',
      },
    };
  }
};
