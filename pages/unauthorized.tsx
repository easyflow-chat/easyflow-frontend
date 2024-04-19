import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import Button from '../components/button/Button';
import NEXT_I18NEXT_CONFIG from '../config/i18n.config';
import { I18nNamespace } from '../enums/i18n.enum';

const Unauthorized: FunctionComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="tw-flex tw-h-[calc(100vh-6rem-32px)] tw-w-full tw-items-center tw-justify-center">
      <div className="tw-text-center">
        <h1>{t('unauthorized:title')}</h1> {/* If possible replace with a ilustration */}
        <p>{t('unauthorized:message')}</p>
        <div className="tw-flex tw-justify-center">
          <div className="tw-m-2">
            <Button onClick={() => router.replace('/login')}>{t('unauthorized:buttons.login')}</Button>
          </div>
          <div className="tw-m-2">
            <Button onClick={() => router.replace('/signup')} invertedStyle>
              {t('unauthorized:buttons.signup')}
            </Button>
          </div>
          <div className="tw-m-2">
            <Button onClick={() => router.replace('/')}>{t('unauthorized:buttons.home')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const translations = await serverSideTranslations(
    ctx.locale ?? NEXT_I18NEXT_CONFIG.i18n.defaultLocale,
    [I18nNamespace.UNAUTHORIZED],
    NEXT_I18NEXT_CONFIG,
  );
  return { props: { ...translations } };
};
