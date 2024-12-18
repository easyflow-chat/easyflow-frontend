'use server';
import { Card, CardHeader } from '@nextui-org/react';
import initTranslations from '@src/app/i18n';
import SignupForm from '@src/components/signup-form/SignupForm';
import TranslationsProvider from '@src/providers/translation-provider/TranslationsProvider';
import { redirect } from 'next/navigation';
import { FunctionComponent } from 'react';
import { APIOperation } from '../../../services/api-services/common';
import serverRequest from '../../../services/api-services/requests/server-side';
import { Props } from '../layout';

const i18nNamespaces = ['signup', 'errors'];

const Home: FunctionComponent<Props> = async props => {
  const res = await serverRequest<APIOperation.CHECK_LOGIN>({ op: APIOperation.CHECK_LOGIN });
  if (res.success) {
    redirect('/chat');
  }
  const params = await props.params;

  const { locale } = params;

  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
      <div>
        <Card className="m-5 w-[80vw] max-w-[500px] p-5">
          <CardHeader>
            <h3>{t('signup:title')}</h3>
          </CardHeader>
          <SignupForm />
        </Card>
      </div>
    </TranslationsProvider>
  );
};

export default Home;
