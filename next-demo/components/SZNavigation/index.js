import {useState, Fragment} from 'react';
// import Link from 'next/link';
import PropTypes from 'prop-types';
import {i18n, Link, withTranslation} from '../../i18n';

const menus = [
  {
    title: '首页',
    path: '/',
    id: '/',
  },
  {
    title: '约稿',
    path: '/drafts',
    id: '/drafts',
  },
  {
    title: '画师',
    path: '/artist',
    id: '/artist.',
  },
  {
    title: '作品',
    path: '/works',
    id: '/works',
  },
  {
    title: 'APP下载',
    path: '/download',
    id: '/download',
  },
];
function SZNavigation({stars, t}) {
  const [num, setNum] = useState (0);
  return (
    <Fragment>
      {menus.map (item => (
        <Link key={item.id} href={item.path}>
          {item.title}
        </Link>
      ))}
      <button onClick={setNum.bind (this, v => v + 1)}>+</button>
      <button onClick={setNum.bind (this, v => v - 1)}>-</button>
      <p>
      {t ('to-second-page')}
      *********************************************************
      </p>
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
export default withTranslation('common')(SZNavigation);
