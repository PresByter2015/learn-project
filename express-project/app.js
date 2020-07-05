const express = require ('express');
const app = express ();
const port = 3000;

app.use ((req, res, next) => {
  console.log ('logger');
  next ();
});
// 中间件 放在 路由之前

app.get ('/', (req, res) => {
  //   res.send ('Hello World!');
  throw new Error ('I am sorry');
});
// 错误拦截
// 放到请求 后面
app.use ((err, req, res, next) => {
  console.log ('err', err);
  res.status (500).json ({
    error: -1,
    msg: err.toString (),
  });
});

app.listen (port, () => console.log (`Example app listening on port ${port}!`));
