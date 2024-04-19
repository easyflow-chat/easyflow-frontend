import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Login from '../components/login/Login';
import NEXT_I18NEXT_CONFIG from '../config/i18n.config';
import { I18nNamespace } from '../enums/i18n.enum';
import { APIOperation } from '../services/api-services/common';
import { serverSideRequest } from '../services/api-services/server-side';

const LoginPage = (): JSX.Element => {
  return <Login />;
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const translations = await serverSideTranslations(
    ctx.locale ?? NEXT_I18NEXT_CONFIG.i18n.defaultLocale,
    [I18nNamespace.COMMON, I18nNamespace.LOGIN],
    NEXT_I18NEXT_CONFIG,
  );

  try {
    const userRes = await serverSideRequest<APIOperation.GET_USER>(ctx.req, { op: APIOperation.GET_USER });
    if (userRes.data) {
      return {
        redirect: {
          permanent: false,
          destination: `/chat/${userRes.data.id}`,
        },
      };
    }
    return { props: { ...translations } };
  } catch {
    return { props: { ...translations } };
  }
};
