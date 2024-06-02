import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
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
        <ewc-button-group>
          <ewc-button onClick={() => router.replace('/login')} label={t('unauthorized:buttons.login')} />
          <ewc-button
            onClick={() => router.replace('/signup')}
            theme="secondary"
            label={t('unauthorized:buttons.signup')}
          />
          <ewc-button onClick={() => router.replace('/')} label={t('unauthorized:buttons.home')} />
        </ewc-button-group>
      </div>
    </div>
  );
};

export default Unauthorized;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const translations = await serverSideTranslations(
    ctx.locale ?? NEXT_I18NEXT_CONFIG.i18n.defaultLocale,
    [I18nNamespace.COMMON, I18nNamespace.UNAUTHORIZED],
    NEXT_I18NEXT_CONFIG,
  );
  return { props: { ...translations } };
};
