import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import Button from '../components/button/Button';
import NEXT_I18NEXT_CONFIG from '../config/i18n.config';
import { I18nNamespace } from '../enums/i18n.enum';
import logo from '../public/images/logo.svg';

const Home: FunctionComponent = (): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="tw-fixed tw-left-0 tw-top-20 tw-flex tw-h-fit tw-min-h-[calc(100%-272px)] tw-w-[calc(100vw-192px)] tw-flex-col tw-items-center tw-justify-center tw-p-24 tw-backdrop-brightness-75 xl:tw-flex-row">
      <div className="tw-m-5 tw-flex tw-flex-col tw-items-center xl:tw-flex-row 3xl:tw-m-20">
        <Image src={logo} alt="Logo" className="tw-h-full tw-w-full dark:tw-invert" draggable="false" />
        <h1 className="tw-m-0 tw-text-[125px] tw-font-light md:tw-text-[150px] lg:tw-text-[175px] xl:tw-text-[200px] 2xl:tw-text-[225px] 3xl:tw-text-[250px]">
          Easy <br />
          Flow
        </h1>
      </div>
      <div className="tw-m-5 tw-flex tw-flex-col tw-items-center tw-justify-center 3xl:tw-m-20">
        <p className="xl:tw-text[45px] tw-text-center tw-text-[30px] tw-font-semibold md:tw-text-[35px] lg:tw-text-[40px] 2xl:tw-text-[50px] 3xl:tw-text-[60px]">
          {t('home.title')}
        </p>
        <Button onClick={() => router.push('/signup')}>{t('home.getStarted')}</Button>
      </div>
    </div>
  );
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
