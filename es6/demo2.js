const getParamsUrlFormat = url => {
  const paramsArr = url.split ('&');
  let obj = {};
  for (let i = 0; i < paramsArr.length; i++) {
    const item = paramsArr[i].split ('=');
    obj = {...{[item[0]]: item[1]}, ...obj};
  }
  return obj;
};

function carry (fn, ...rest) {
  if (rest > 7) {
    return false;
  }
  return fn (...rest);
}

carry (d => {
  console.log (d);
}, 9);
