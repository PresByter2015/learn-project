// 发布-订阅模式
const EventEmit = function () {
  this.events = {};
  this.on = function (name, cb) {
    if (this.events[name]) {
      this.events[name].push (cb);
    } else {
      this.events[name] = [cb];
    }
  };
  this.trigger = function (name, ...arg) {
    if (this.events[name]) {
      this.events[name].forEach (eventListener => {
        eventListener (...arg);
      });
    }
  };
};

let event = new EventEmit();
MessageCenter.fetch(){
  event.on('success',()=> {
    console.log('通知消息中心获取最新内容');
  });
}
Order.update(){
  event.on('success',()=> {
    console.log('更新订单信息');
  });
}
Checker.alert(){
  event.on('success',()=> {
    console.log('通知负责人审核');
  });
}
event.trigger('success');