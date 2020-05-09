/**
 * https://github.com/yahoo/react-intl/issues/416
 */
import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

addLocaleData(en);
addLocaleData(zh);

const allLocales = {
  'zh-CN': require('./locales/zh-CN').default,
  'en-US': require('./locales/en-US').default
};

let lang = localStorage.getItem('HUISHE_INTL_LANGUAGE_CONSTANT');
if (lang) {
  if (lang === 'undefined') {
    lang = '';
  }
  lang = lang.replace(/_/g, '-');
}
lang = (lang || navigator.language);

const locale = allLocales[lang || 'en-US'];
const provider = new IntlProvider({ ...locale });
const { intl } = provider.getChildContext();

/**
 * Provider Component
 */
class RouteProvider extends Component {
  static propTypes = {
    children: React.PropTypes.object
  };

  render() {
    return (
      <IntlProvider locale={locale.locale} messages={locale.messages}>
        {this.props.children}
      </IntlProvider>
    );
  }
}

export default intl;
export {
  RouteProvider
};
