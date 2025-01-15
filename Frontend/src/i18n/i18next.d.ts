import i18next from 'i18next';

import common from './locales/en/common.json';
import fields from './locales/en/fields.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    resources: {
      common: typeof common;
      fields: typeof fields;
    };
    defaultNs: 'common';
  }
}
i18next.init({
  returnNull: false
});
