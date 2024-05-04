import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SignUp from '../components/signup/Signup';
import NEXT_I18NEXT_CONFIG from '../config/i18n.config';
import { I18nNamespace } from '../enums/i18n.enum';
import { APIOperation } from '../services/api-services/common';
import { serverSideRequest } from '../services/api-services/server-side';

const SignupPage = (): JSX.Element => {
  return <SignUp />;
};

export default SignupPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const translations = await serverSideTranslations(
    ctx.locale ?? NEXT_I18NEXT_CONFIG.i18n.defaultLocale,
    [I18nNamespace.COMMON, I18nNamespace.SIGNUP],
    NEXT_I18NEXT_CONFIG,
  );

  try {
    const res = await serverSideRequest<APIOperation.GET_USER>(ctx.req, { op: APIOperation.GET_USER });

    if (res.data) {
      return {
        redirect: {
          permanent: false,
          destination: `/chat/${res.data.id}`,
        },
      };
    }
    return { props: { ...translations } };
  } catch {
    return { props: { ...translations } };
  }
};
