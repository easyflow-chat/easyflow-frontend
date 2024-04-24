import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FunctionComponent } from 'react';
import NEXT_I18NEXT_CONFIG from '../config/i18n.config';
import { I18nNamespace } from '../enums/i18n.enum';

const Home: FunctionComponent = (): JSX.Element => {
  return <h1>Hello World</h1>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const translations = await serverSideTranslations(
    ctx.locale ?? NEXT_I18NEXT_CONFIG.i18n.defaultLocale,
    [I18nNamespace.COMMON],
    NEXT_I18NEXT_CONFIG,
  );
  return {
    props: { ...translations },
  };
};
