const USERS = {
  huishe: {
    email: 'service@sdmobi.cn',
    passwd: '123456'
  }
};

module.exports = USERS[process.env.user || process.env.SHOW_USER || 'demo'];
