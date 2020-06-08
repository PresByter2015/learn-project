const fs = require ('fs');
function writeIn () {
  const content = `
  const data = 'Some content!'
  console.error (data);
  `;
  fs.writeFile ('./a.js', content, err => {
    if (err) {
      console.error (err);
      return;
    }
    //file written successfully
  });
}
try {
  const data = fs.readFileSync ('./a.js', 'utf8');
  console.error (data);
  writeIn ();
} catch (err) {
  writeIn ();
}
