import Head from 'next/head';
import {useState, Fragment} from 'react';
function About({stars}) {
  const [num, setNum] = useState (0);
  return (
    <Fragment>
      <Head>
        <title>My page title</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <p>
        数值: {num}
      </p>
      <button onClick={setNum.bind (this, v => v + 1)}>+</button>
      <button onClick={setNum.bind (this, v => v - 1)}>-</button>
      <p>
        About Next stars: {stars}
      </p>
    </Fragment>
  );
}
About.getInitialProps = async ctx => {
  console.log (ctx);
  const res = await fetch ('http://localhost:5000/cats/do');
  const json = await res.json ();
  return {stars: json.status};
};
export default About;
