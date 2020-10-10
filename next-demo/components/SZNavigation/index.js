import {useState, Fragment} from 'react';
// import Link from 'next/link';
import PropTypes from 'prop-types';
import {i18n, Link, withTranslation} from '../../i18n';
import styles from './navigation.module.scss';
// import logo from '../../public/static/assets/logo-white.svg'
const menus = [
  {
    title: '首页',
    path: '/',
    id: 'home',
  },
  {
    title: '约稿',
    path: '/drafts',
    id: 'Commissions',
  },
  {
    title: '画师',
    path: '/artist',
    id: 'Artist',
  },
  {
    title: '作品',
    path: '/works',
    id: 'Works',
  },
  {
    title: 'APP下载',
    path: '/download',
    id: 'Download',
  },
];
function SZNavigation({stars, t}) {
  const [num, setNum] = useState (0);
  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles['header-box']}>
          <img
            src={
              'http://lixing-develop.oss-cn-hangzhou.aliyuncs.com/large_file/1602343238123.svg'
            }
          />
          <div>
            {menus.map (item => (
              <Link key={item.id} href={item.path}>
                {t (item.id)}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <span>1</span>
          <span className={styles['header-lan']}>CN</span>
          <span>1</span>
          <span>1</span>
        </div>
      </div>
    </Fragment>
  );
}
SZNavigation.getInitialProps = async ctx => {
  //   console.log (ctx);
  //   const res = await fetch ('http://localhost:5000/cats/do');
  //   const json = await res.json ();
  //   return {stars: json.status};
};
SZNavigation.propTypes = {
  t: PropTypes.func.isRequired,
};
export default withTranslation ('common') (SZNavigation);
