import {useState, Fragment} from 'react';
import Button from '@material-ui/core/Button';
function Demo () {
  return (
    <Fragment>
      <div>404</div>
      <Link href="/about">
        <Button type="Button">
          {t ('to-second-page')}
        </Button>
      </Link>
    </Fragment>
  );
}
//   Demo.getInitialProps = async ctx => {
//     const res = await fetch ('http://localhost:5000/cats/do');
//     const json = await res.json ();
//     console.log (json);
//     return {stars: json.status};
//   };
export default Demo;
