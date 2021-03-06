import {useContext} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import getConfig from 'next/config';
// import Link from 'next/link';
// import {useTranslation} from 'next-i18next';
import {I18nContext} from 'next-i18next';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import SZNavigation from '../components/SZNavigation';
import {i18n, Link, withTranslation} from '../i18n';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Homepage({t}) {
  const {publicRuntimeConfig} = getConfig ();
  const {i18n: {language}} = useContext (I18nContext);
  console.log ('process.env', publicRuntimeConfig.env.API);
  // console.log ('language', language);
  // console.log (t, i18n.language);
  return (
    <div className={styles.container}>
      <SZNavigation />
      <Head>
        <title>{t ('title')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header title={t ('h1')} /> */}
      {/* <Button type="primary">Hello</Button> */}

      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Input />
      <button
        type="button"
        onClick={() =>
          i18n.changeLanguage (i18n.language === 'en' ? 'zh' : 'en')}
      >
        {t ('change-locale')}
      </button>
      <Link href="/about">
        <button type="button">
          {t ('to-second-page')}
        </button>
      </Link>
      <Link href="/demo">
        demo
      </Link>
      <div className={styles.test}>
        <Checkbox
          defaultChecked
          color="primary"
          inputProps={{'aria-label': 'secondary checkbox'}}
        />
        <span>222</span>
      </div>
      <main className={styles.main}>
        <a href="./demo">demo页面</a>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href={{pathname: '/about', query: {name: 'Zeit'}}}>
              <a>About Us</a>
            </Link>
          </li>
        </ul>
        <h1 className={styles.title}>
          {process.env.customKey}
          Welcome11 to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <Footer />
        <p className={styles.description}>
          {t ('h1')}
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
Homepage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'footer'],
});

Homepage.propTypes = {
  t: PropTypes.func.isRequired,
};
export default withTranslation ('common') (Homepage);
