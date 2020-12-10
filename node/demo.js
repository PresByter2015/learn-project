const fs = require ('fs');
let appid='wxee97e2b2663753c2'
function writeIn () {
  const content = `{
    "miniprogramRoot": "./dist",
    "projectname": "dongplusxcx",
    "description": "",
    "appid": "${appid}",
    "setting": {
      "urlCheck": true,
      "es6": false,
      "postcss": false,
      "minified": false
    },
    "compileType": "miniprogram"
  }`;
  fs.writeFileSync (process.cwd()+'/project.config.json', content);
}
try {
  const data = fs.readFileSync ('./a.json', 'utf8');
  console.error (data);
  writeIn ();
} catch (err) {
  writeIn ();
}
