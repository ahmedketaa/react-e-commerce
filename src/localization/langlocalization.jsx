import React from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from '../locales/en.json';
import arMessages from '../locales/ar.json';

const messages = {
  en: enMessages,
  ar: arMessages,
};

const LocalizationProvider = ({ children, locale }) => {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </IntlProvider>
  );
};

export default LocalizationProvider;
