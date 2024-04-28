/**@type {import('next-i18next').UserConfig} */
import path from 'path';
const i18n = {
  defaultLocale: 'placeholder',
  locales: ['en', 'de', 'placeholder'],
  localeDetection: false,
  localePath: path.resolve('./public/locales'),
  localeStructure: '{{lng}}/{{ns}}',
};

export default i18n;
