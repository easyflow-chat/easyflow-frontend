import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FunctionComponent, useEffect, useState } from 'react';
import ChatArea from '../components/chat/chatArea/ChatArea';
import ChatList from '../components/chat/chatList/ChatList';
import NEXT_I18NEXT_CONFIG from '../config/i18n.config';
import { I18nNamespace } from '../enums/i18n.enum';
import useKeys from '../hooks/useKeys';
import { APIOperation } from '../services/api-services/common';
import { serverSideRequest } from '../services/api-services/server-side';
import { UserType } from '../types/user.type';

interface ChatTypeProps {
  user: UserType;
}

const Chat: FunctionComponent<ChatTypeProps> = ({ user }): JSX.Element => {
  const [selectedChatId, setSelectedChatId] = useState<string>();

  const [timer, setTimer] = useState<number>(0);

  const time = setTimeout(() => {
    setTimer(timer + 1);
  }, 1000);

  const { getKeys } = useKeys();

  const [wrapingKey, setWrappingKey] = useState<CryptoKey>();

  useEffect(() => {
    const keys = async (): Promise<void> => {
      const keys = await getKeys();
      setWrappingKey(keys.privateKey);
      clearTimeout(time);
    };
    void keys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {!wrapingKey && (
        <div className="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center">
          <h3>
            {timer < 4 ? 'Getting end to end encryption keys' : 'Hold on just a second'}
            {Array.from({ length: (timer % 3) + 1 }, () => '.').join('')}
          </h3>
          <ewc-loader size={64} />
        </div>
      )}
      {wrapingKey && (
        <div className="tw-flex tw-h-[calc(100vh-113px)]">
          <div className="col-xs-3 tw-p-0">
            <ChatList user={user} setSelectedChatId={setSelectedChatId} selectedChatId={selectedChatId} />
          </div>
          <div className="col-xs-9 tw-p-0">
            <ChatArea selectedChatId={selectedChatId} privateKey={wrapingKey} />
          </div>
        </div>
      )}
    </>
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
