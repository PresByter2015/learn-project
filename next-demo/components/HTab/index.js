import styles from './tab.module.scss'
function HTab({stars}) {
  return (
    <div>
      <p>我是HTab页面HTab Next stars: {stars}</p>
    </div>
  );
}
// HTab.getInitialProps = async ctx => {
// const res = await fetch ('http://localhost:5000/cats/do');
// const json = await res.json ();
// console.log (json);
// return {stars: json.status};
// };
export default HTab;
