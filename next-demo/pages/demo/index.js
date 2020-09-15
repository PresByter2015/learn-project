function Demo({stars}) {
  return <div>我是demo页面Demo Next stars: {stars}</div>;
}
Demo.getInitialProps = async ctx => {
  const res = await fetch ('http://localhost:5000/cats/do');
  const json = await res.json ();
  console.log (json);
  return {stars: json.status};
};
export default Demo;
