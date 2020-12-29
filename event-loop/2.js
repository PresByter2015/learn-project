const temp = [
  {id: 'mylike', title: '我的关注', value: ''},
  {id: 'allprodcuts', title: '全部产品', value: ''},
];
const index = temp.findIndex (item => item.id === 'allprodcuts');
console.log (index);
