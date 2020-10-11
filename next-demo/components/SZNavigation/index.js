import {useState, Fragment} from 'react';
import {withRouter} from 'next/router';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
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
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    top:theme.spacing(10),
  },
}));
function SZNavigation({t, router}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState (null);
  const [checkText, setcheckText] = React.useState ('CN');

  const handleChangeLan = type => {
    setcheckText (type === 'en' ? 'EN' : 'CN');
    i18n.changeLanguage (type);
    setAnchorEl (null);
  };

  console.log (router);
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
              <Link
                key={item.id}
                href={item.path}
                className={styles['header-nav']}
              >
                {t (item.id)}
              </Link>
            ))}
          </div>
        </div>

        <div style={{marginRight: '80px'}}>
          <span>1</span>
          <span
            className={styles['header-lan']}
            onMouseEnter={e => setAnchorEl (e.currentTarget)}
            onMouseLeave={e => setAnchorEl (null)}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            {checkText}
          </span>
          <span>1</span>
          <span>1</span>
        </div>
      </div>
      <Popover
        id="simple-menu"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        marginThreshold={20}
        anchorEl={anchorEl}
        onClose={e => setAnchorEl (null)}
        open={Boolean (anchorEl)}
        disableRestoreFocus
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        The content of the Popover.
      </Popover>
      {/* <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean (anchorEl)}
        onClose={() => setAnchorEl (null)}
      >
        <MenuItem onClick={() => handleChangeLan ('zh')}>CN - 简体中文</MenuItem>
        <MenuItem onClick={() => handleChangeLan ('en')}>EN - English</MenuItem>
      </Menu> */}
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
export default withTranslation ('common') (withRouter (SZNavigation));
