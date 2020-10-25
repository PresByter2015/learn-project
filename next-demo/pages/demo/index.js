import Footer from '../../components/Footer';
import styles from './demo.module.scss'
function Demo({stars}) {
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
export default Demo;
