const fs = require ('fs');
try {
  const data = fs.readFileSync ('./a.js', 'utf8');
  console.error (data);
} catch (err) {
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
