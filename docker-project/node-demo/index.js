/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description: docker 开启node 服务。 
* @author: PresByter
* @date  : 2020/06/16 11:20:27
* @file  : index.js
*/
'use strict';
 
var express = require('express');

var PORT = 8888;

var app = express();
app.get('/', function (req, res) {
  res.send('node.js Hello world---111\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);