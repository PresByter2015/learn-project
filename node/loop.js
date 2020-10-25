const p1 = new Promise ((resolve, reject) => {
  resolve ('success');
  reject ('failed');
});
const p2 = () => {
  //   console.log ('p2');
  //   return 'p2';
  throw Error ('err');
};
const loops = async () => {
  console.log (1);
  const res = await p1;
  console.log (2, res);
  try {
    const res2 = p2 ();
    console.log (res2);
  } catch (error) {}
  console.log (3);
};

loops ();
