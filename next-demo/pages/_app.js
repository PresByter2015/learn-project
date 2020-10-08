import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';
import App from 'next/app';
import {appWithTranslation} from '../i18n';

import '../styles/globals.css';

const theme = createMuiTheme ({
  palette: {
    primary: {
      light: '#62f0ff',
      main: '#02bdd1',
      dark: '#008ca0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#62f0ff',
      main: '#02bdd1',
      dark: '#008ca0',
      contrastText: '#000',
    },
  },
});

const MyApp = ({Component, pageProps}) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

MyApp.getInitialProps = async appContext => ({
  ...(await App.getInitialProps (appContext)),
});

export default appWithTranslation (MyApp);

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp
