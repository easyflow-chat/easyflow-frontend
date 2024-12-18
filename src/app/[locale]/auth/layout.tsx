'use server';
import type { Metadata } from 'next';

import initTranslations from '@src/app/i18n';
import type { FunctionComponent, PropsWithChildren, ReactElement } from 'react';
import { Props } from '../layout';

const i18nNamespaces = ['metadata'];

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;
  const i18n = await initTranslations(locale, i18nNamespaces);
  return {
    title: i18n.t('metadata:auth.title'),
  };
};

const RootLayout: FunctionComponent<PropsWithChildren> = async ({ children }): Promise<ReactElement> => {
  return <main className="h-full w-screen">{children}</main>;
};

export default RootLayout;
