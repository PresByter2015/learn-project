const NextI18Next = require ('next-i18next').default;
const {localeSubpaths} = require ('next/config').default ().publicRuntimeConfig;
const path = require ('path');

module.exports = new NextI18Next ({
  ignoreRoutes: ['/.next/', '/_next/', '/static/', '/public/', '/api/'],
  defaultLanguage: 'en',
  otherLanguages: ['de', 'zh'],
  localeSubpaths,
  localePath: path.resolve ('./public/static/locales'),
});
