function Demo () {
  return <div>404</div>;
}
//   Demo.getInitialProps = async ctx => {
//     const res = await fetch ('http://localhost:5000/cats/do');
//     const json = await res.json ();
//     console.log (json);
//     return {stars: json.status};
//   };
export default Demo;
