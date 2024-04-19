import { UserConfig } from 'next-i18next';

const NEXT_I18NEXT_CONFIG: UserConfig = {
  i18n: {
    defaultLocale: 'placeholder',
    locales: ['en', 'de', 'placeholder'],
    localeDetection: false,
  },
};

export default NEXT_I18NEXT_CONFIG;
