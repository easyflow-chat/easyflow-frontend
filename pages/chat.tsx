import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FunctionComponent, useContext, useEffect } from 'react';
import NEXT_I18NEXT_CONFIG from '../config/i18n.config';
import { GlobalContext } from '../context/gloabl.context';
import { I18nNamespace } from '../enums/i18n.enum';
import { APIOperation } from '../services/api-services/common';
import { serverSideRequest } from '../services/api-services/server-side';
import { UserType } from '../types/user.type';

interface ChatType {
  propUser?: UserType;
}

const Chat: FunctionComponent<ChatType> = ({ propUser }): JSX.Element => {
  const { setUser } = useContext(GlobalContext);

  useEffect(() => {
    if (propUser) {
      setUser(propUser);
    }
  }, [propUser, setUser]);

  return (
    <div>
      <h1>Chat</h1>
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
