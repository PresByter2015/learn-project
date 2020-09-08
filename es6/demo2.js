const getParamsUrlFormat = url => {
  const paramsArr = url.split ('&');
  let obj = {};
  for (let i = 0; i < paramsArr.length; i++) {
    const item = paramsArr[i].split ('=');
    obj = {...{[item[0]]: item[1]}, ...obj};
  }
  return obj;
};

console.log (getParamsUrlFormat ('type=1&addr=reccp&id=85&scene=1011&cid='));
