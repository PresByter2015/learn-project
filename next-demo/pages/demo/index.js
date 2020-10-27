import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import {i18n, Link, withTranslation} from '../../i18n';
import styles from './demo.module.scss';
function Demo({stars, t}) {
  console.log ('i18n', i18n.language);
  return (
    <div>
      <p>我是demo页面Demo Next stars: {stars}</p>
      <Footer className={styles.test} />
    </div>
  );
}
// Demo.getInitialProps = async ctx => {
// const res = await fetch ('http://localhost:5000/cats/do');
// const json = await res.json ();
// console.log (json);
// return {stars: json.status};
// };
Demo.propTypes = {
  t: PropTypes.func.isRequired,
};
export default withTranslation ('common') (Demo);
